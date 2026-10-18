namespace FitLog.Application.Features.Routines.DTOs;

// Clase de DTO para la solicitud de actualización de una rutina mediante su id
public class UpdateRoutineRequestDto
{
    public int Id { get; set; }
    public string NewName { get; set; } = string.Empty;
}