namespace FitLog.Application.Features.Exercises.DTOs;

// Clase de DTO para la solicitud de actualización de un ejercicio mediante su id
public class UpdateExerciseRequestDto
{
    public int Id { get; set; }
    public string NewName { get; set; } = string.Empty;
    public int? NewRoutineId { get; set; }
}