using FitLog.Application.Features.Exercises.DTOs;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using FitLog.Application.Interfaces;
using FitLog.Domain.Entities;


namespace FitLog.API.Controllers;

// Clase de controlador para ejercicios
[ApiController]
[Route("api/[controller]")]
public class ExercisesController : ControllerBase
{
    // Repositorio de ejercicios
    private readonly IExerciseRepository _repository;
    // Validador para creación de ejercicio
    private readonly IValidator<CreateExerciseRequestDto> _createValidator;
    // Validador para actualización de ejercicio
    private readonly IValidator<UpdateExerciseRequestDto> _updateValidator;

    // Constructor
    public ExercisesController(IExerciseRepository repository, IValidator<CreateExerciseRequestDto> createValidator, IValidator<UpdateExerciseRequestDto> updateValidator)
    {
        _repository = repository;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }
    
    // Endpoint POST para crear un ejercicio
    [HttpPost]
    public async Task<IActionResult> AddExercise([FromBody] CreateExerciseRequestDto request)
    {
        // Obteniendo resultado de validación
        var validationResult = await _createValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        // Creando objeto ejercicio
        var newExercise = new Exercise
        {
            Name = request.Name
        };
        
        // Llamando a método de creación y guardando resultado
        var exerciseCreated = await _repository.AddAsync(newExercise);

        var response = new ExerciseResponseDto
        {
            Id = exerciseCreated.Id,
            Name = exerciseCreated.Name
        };
        
        return CreatedAtAction(nameof(GetExercises), new {id = response.Id}, response);
    }
    
    // Endpoint GET para obtener todos los ejercicios
    [HttpGet]
    public async Task<IActionResult> GetExercises()
    {
        // Obteniendo todos los ejercicios desde su repositorio
        var exercises = await _repository.GetAllAsync();
        
        // Empaquetando los ejercicios en un DTO de respuesta
        var response = exercises.Select(ex => new ExerciseResponseDto
        {
            Id = ex.Id,
            Name = ex.Name
        });
        
        return Ok(response);
    }
    
    // Endpoint GET para obtener un ejercicio mediante su id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetExerciseById([FromRoute] int id)
    {
        if (id < 1)
        {
            return BadRequest(new {message = "El ID debe ser mayor a 0"});
        }

        var exercise = await _repository.GetByIdAsync(id);

        if (exercise is null)
        {
            return NotFound(new {message = $"El ejercicio con ID {id} no fue encontrado"});
        }

        var response = new ExerciseResponseDto()
        {
            Id = exercise.Id,
            Name = exercise.Name
        };

        return Ok(response);
    }
    
    // Endpoint para la actualización de un ejercicio mediante su id
    [HttpPut]
    public async Task<IActionResult> UpdateExercise([FromBody] UpdateExerciseRequestDto request)
    {
        // Obteniendo resultado de validación
        var validationResult = await _updateValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        var exercise = await _repository.GetByIdAsync(request.Id);
        
        if (exercise is null)
        {
            return NotFound(new {message = "Ejercicio no encontrado"});
        }
        
        await _repository.UpdateAsync(request.Id,  request.NewName);
        
        return NoContent();
    }
    
    
    // Endpoint DELETE para eliminar un ejercicio mediante su id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExerciseById([FromRoute] int id)
    {
        if (id < 1)
        {
            return BadRequest(new {message = "El ID debe ser mayor a 0"});
        }

        var exercise = await _repository.GetByIdAsync(id);

        if (exercise is null)
        {
            return NotFound(new {message = $"El ejercicio con ID {id} no fue encontrado"});
        }

        await _repository.DeleteAsync(id);
        
        return NoContent();

    }
    

}