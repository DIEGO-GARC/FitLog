namespace FitLog.Application.Features.Exercises.DTOs;

//Clase de DTO para la petición de creación de un ejercicio 
public class CreateExerciseRequestDto
{
    // Definir el nombre como el único valor esperado
    public string Name { get; set; } = string.Empty;
}