using FitLog.Application.Features.Routines.DTOs;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using FitLog.Application.Interfaces;
using FitLog.Domain.Entities;

namespace FitLog.API.Controllers;

// Clase de controlador para rutinas
[ApiController]
[Route("api/[controller]")]
public class RoutinesController : ControllerBase
{
    // Repositorio de rutinas
    private readonly IRoutineRepository _repository;
    //Validador para creación de rutinas
    private readonly IValidator<CreateRoutineRequestDto> _createValidator;
    // Validador para actualización de rutinas
    private readonly IValidator<UpdateRoutineRequestDto> _updateValidator;

    // Constructor
    public RoutinesController(IRoutineRepository repository, IValidator<CreateRoutineRequestDto> createValidator, IValidator<UpdateRoutineRequestDto> updateValidator)
    {
        _repository = repository;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }
    
    // Endpoint POST para crear una rutina
    [HttpPost]
    public async Task<IActionResult> AddExercise([FromBody] CreateRoutineRequestDto request)
    {
        // Obteniendo resultado de validación
        var validationResult = await _createValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }
        
        // Creando objeto rutina
        var newRoutine = new Routine
        {
            Name = request.Name
        };
        
        // Llamando a método de creación y guardando resultado
        var routineCreated = await _repository.AddAsync(newRoutine);

        var response = new RoutineResponseDto
        {
            Id = routineCreated.Id,
            Name = routineCreated.Name
        };
        
        return CreatedAtAction(nameof(GetRoutines), new {id = response.Id}, response);
    }
    
    // Endpoint GET para obtener todas las rutinas
    [HttpGet]
    public async Task<IActionResult> GetRoutines()
    {
        // Obteniendo todos los ejercicios desde su repositorio
        var routines = await _repository.GetAllAsync();
        
        // Empaquetando los ejercicios en un DTO de respuesta
        var response = routines.Select(routine => new RoutineResponseDto
        {
            Id = routine.Id,
            Name = routine.Name
        });
        
        return Ok(response);
    }
    
    // Endpoint GET para obtener una rutina mediante su id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoutineById([FromRoute] int id)
    {
        if (id < 1)
        {
            return BadRequest(new {message = "El ID debe ser mayor a 0"});
        }

        var routine = await _repository.GetByIdAsync(id);

        if (routine is null)
        {
            return NotFound(new {message = $"La rutina con ID {id} no fue encontrada"});
        }

        var response = new RoutineResponseDto()
        {
            Id = routine.Id,
            Name = routine.Name,
        };

        return Ok(response);
    }
    
    // Endpoint para la actualización de una rutina mediante su id
    [HttpPut]
    public async Task<IActionResult> UpdateExercise([FromBody] UpdateRoutineRequestDto request)
    {
        // Obteniendo resultado de validación
        var validationResult = await _updateValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var routine = await _repository.GetByIdAsync(request.Id);
        
        if (routine is null)
        {
            return NotFound(new {message = "Rutina no encontrada"});
        }
        
        await _repository.UpdateAsync(request.Id,  request.NewName);
        
        return NoContent();
    }
    
}