using Microsoft.EntityFrameworkCore;
using FitLog.Infrastructure.Data;
using FitLog.Domain.Entities;
using FitLog.Application.Interfaces;

namespace FitLog.Infrastructure.Repositories;

// Clase repositorio de ejercicios
public class ExerciseRepository : IExerciseRepository
{
    
    // Contexto de la base de datos
    private readonly FitLogDbContext _context;

    // Constructor
    public ExerciseRepository(FitLogDbContext context)
    {
        _context = context;
    }

    // Método para agregar un ejercicio
    public async Task<Exercise> AddAsync(Exercise exercise)
    {
        await _context.Exercises.AddAsync(exercise);
        
        await _context.SaveChangesAsync();
        
        return exercise;
    }
    
    // Método para obtener todos los ejercicios
    public async Task<IEnumerable<Exercise>> GetAllAsync()
    {
        return await _context.Exercises.ToListAsync();
    }
    
    // Método para obtener un ejercicio mediante su id
    public async Task<Exercise> GetByIdAsync(int id)
    {
        return await _context.Exercises.FindAsync(id);
    }
    
    // Método para actualizar un ejercicio mediante su id
    public async Task<Exercise> UpdateAsync(int id, string newName)
    {
        var exercise = await _context.Exercises.FindAsync(id);

        exercise.Name = newName;
        
        var rowsAffected = await _context.SaveChangesAsync();
        
        return exercise;
    }

    // Método para borrar un ejercicio mediante su id
    public async Task<bool> DeleteAsync(int id)
    {
        var exercise = await _context.Exercises.FindAsync(id);
        _context.Exercises.Remove(exercise);
        var rowsAffected = await _context.SaveChangesAsync();
        
        return true;
    }


}