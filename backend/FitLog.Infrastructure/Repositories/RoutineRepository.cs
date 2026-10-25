using Microsoft.EntityFrameworkCore;
using FitLog.Infrastructure.Data;
using FitLog.Domain.Entities;
using FitLog.Application.Interfaces;


namespace FitLog.Infrastructure.Repositories;

// Clase repositorio de rutinas
public class RoutineRepository : IRoutineRepository
{
    // Contexto de la base de datos
    private readonly FitLogDbContext _context;
    
    // Constructor
    public RoutineRepository(FitLogDbContext context)
    {
        _context = context;
    }

    // Método para agregar una rutina
    public async Task<Routine> AddAsync(Routine routine)
    {
        await _context.Routines.AddAsync(routine);
        
        await _context.SaveChangesAsync();
        
        return routine;
    }

    // Método para obtener todas las rutinas
    public async Task<IEnumerable<Routine>> GetAllAsync()
    {
        return await _context.Routines.ToListAsync(); 
    }
    
    // Método para obtener una rutina mediante su id
    public async Task<Routine> GetByIdAsync(int id)
    {
        return await _context.Routines.FindAsync(id);
    }
    
    // Método para actualizar una rutina mediante su id
    public async Task<Routine> UpdateAsync(int id, string newName)
    {
        var routine = await _context.Routines.FindAsync(id);

        routine.Name = newName;
        
        var rowsAffected = await _context.SaveChangesAsync();
        
        return routine;
    }
    
    // Método para borrar una rutina mediante su id
    public async Task<bool> DeleteAsync(int id)
    {
        var routine = await _context.Routines.FindAsync(id);
        
        // Buscar los ejercicios que referencian esta rutina
        var ejerciciosAfectados = await _context.Exercises
            .Where(e => e.RoutineId == id)
            .ToListAsync();

        // Poner en null la referencia antes de borrar la rutina
        foreach (var ejercicio in ejerciciosAfectados)
        {
            ejercicio.RoutineId = null;
        }
        
        _context.Routines.Remove(routine);
        var rowsAffected = await _context.SaveChangesAsync();
        
        return true;
    }
}