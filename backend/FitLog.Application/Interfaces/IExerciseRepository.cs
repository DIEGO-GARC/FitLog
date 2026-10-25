using FitLog.Domain.Entities;

namespace FitLog.Application.Interfaces;

// Interfaz para el repositorio de ejercicios
public interface IExerciseRepository
{

    // Método para agregar un ejercicio
    Task<(Exercise exercise, string? routineName)> AddAsync(Exercise exercise);
    
    // Método para obtener todos los ejercicios
    Task<IEnumerable<(Exercise exercise, string? routineName)>> GetAllAsync();

    // Método para obtener un ejercicio mediante su id
    Task<(Exercise exercise, string? routineName)?> GetByIdAsync(int id);
    
    // Método para actualizar un ejercicio mediante su id
    Task<Exercise> UpdateAsync(int id, string newName, int? newRoutineId);
    
    // Método para borrar un ejercicio mediante su id
    Task<bool> DeleteAsync(int id);
}