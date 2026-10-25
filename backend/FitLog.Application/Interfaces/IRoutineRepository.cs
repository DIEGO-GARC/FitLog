using FitLog.Domain.Entities;

namespace FitLog.Application.Interfaces;

public interface IRoutineRepository
{
    // Método para agregar una rutina
   Task<Routine> AddAsync(Routine routine);
    
    // Método para obtener todas las rutinas
    Task<IEnumerable<Routine>> GetAllAsync();

    // Método para obtener una rutina mediante su id
    Task<Routine> GetByIdAsync(int id);
    
    // Método para actualizar una rutina mediante su id
    Task<Routine> UpdateAsync(int id, string newName);
    
    // Método para borrar una rutina mediante su id
    Task<bool> DeleteAsync(int id);
}