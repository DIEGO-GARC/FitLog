using FitLog.Domain.Entities;

namespace FitLog.Application.Interfaces;

public interface IRoutineRepository
{
    // Método para agregar un ejercicio
   // Task<Routine> AddAsync(Routine routine);
    
    // Método para obtener todos los ejercicios
    Task<IEnumerable<Routine>> GetAllAsync();

    // Método para obtener un ejercicio mediante su id
   // Task<Routine> GetByIdAsync(int id);
    
    // Método para actualizar un ejercicio mediante su id
   // Task<Routine> UpdateAsync(int id, string newName);
    
    // Método para borrar un ejercicio mediante su id
   // Task<bool> DeleteAsync(int id);
}