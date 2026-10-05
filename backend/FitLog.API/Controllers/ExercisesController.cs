using FitLog.Application.Features.Exercises.DTOs;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using FitLog.Application.Interfaces;
using FitLog.Domain.Entities;
using FitLog.Application.Features.Exercises.DTOs;

namespace FitLog.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ExercisesController : ControllerBase
{

    private readonly IExerciseRepository _repository;
    private readonly IValidator<CreateExerciseRequestDto> _validator;

    public ExercisesController(IExerciseRepository repository, IValidator<CreateExerciseRequestDto> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetExercises()
    {
        var exercises = await _repository.GetAllAsync();

        var response = exercises.Select(ex => new ExerciseResponseDto
        {
            Id = ex.Id,
            Name = ex.Name
        });
        
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> AddExercise([FromBody] CreateExerciseRequestDto request)
    {

        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var newExercise = new Exercise
        {
            Name = request.Name
        };
        
        var exerciseCreated = await _repository.AddAsync(newExercise);

        var response = new ExerciseResponseDto
        {
            Id = exerciseCreated.Id,
            Name = exerciseCreated.Name
        };
        
        return CreatedAtAction(nameof(GetExercises), new {id = response.Id}, response);
    }

}