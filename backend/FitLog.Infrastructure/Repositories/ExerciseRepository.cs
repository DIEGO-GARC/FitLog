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
    private readonly IRoutineRepository _routineRepo;

    // Constructor
    public ExerciseRepository(FitLogDbContext context,  IRoutineRepository routineRepo)
    {
        _context = context;
        _routineRepo = routineRepo;
    }

    // Método para agregar un ejercicio
    public async Task<(Exercise exercise, string? routineName)> AddAsync(Exercise exercise)
    {
        await _context.Exercises.AddAsync(exercise);
        
        await _context.SaveChangesAsync();
        
        var routineName = _context.Routines.FirstOrDefault(x => x.Id == exercise.RoutineId)?.Name;
        
        return (exercise, routineName);
    }
    
    // Método para obtener todos los ejercicios
    public async Task<IEnumerable<(Exercise exercise, string? routineName)>> GetAllAsync()
    {
        var result = await _context.Exercises
            .AsNoTracking()
            .Select(e => new
            {
                Exercise = e,
                RoutineName = e.Routine != null ? e.Routine.Name : null
            })
            .ToListAsync();

        return result.Select(x => (x.Exercise, x.RoutineName));
    }
    
    // Método para obtener un ejercicio mediante su id
    public async Task<(Exercise exercise, string? routineName)?> GetByIdAsync(int id)
    {
        var result = await _context.Exercises
            .AsNoTracking()
            .Where(e => e.Id == id)
            .Select(e => new
            {
                Exercise = e,
                RoutineName = e.Routine != null ? e.Routine.Name : null
            })
            .FirstOrDefaultAsync();
        
        return result is null ? null : (result.Exercise, result.RoutineName);

    }
    
    // Método para actualizar un ejercicio mediante su id
    public async Task<Exercise> UpdateAsync(int id, string newName, int? newRoutineId)
    {
        var exercise = await _context.Exercises.FindAsync(id);
        
            exercise.RoutineId = newRoutineId;
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