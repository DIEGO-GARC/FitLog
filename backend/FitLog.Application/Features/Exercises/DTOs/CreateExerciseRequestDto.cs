namespace FitLog.Application.Features.Exercises.DTOs;

//Clase de DTO para la petición de creación de un ejercicio 
public class CreateExerciseRequestDto
{
    public string Name { get; set; } = string.Empty;
    public int? RoutineId { get; set; }
}