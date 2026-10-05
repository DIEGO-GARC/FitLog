using Microsoft.EntityFrameworkCore;
using FitLog.Infrastructure.Data;
using FitLog.Domain.Entities;
using FitLog.Application.Interfaces;

namespace FitLog.Infrastructure.Repositories;

public class ExerciseRepository : IExerciseRepository
{
    private readonly FitLogDbContext _context;

    public ExerciseRepository(FitLogDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Exercise>> GetAllAsync()
    {
        return await _context.Exercises.ToListAsync();
    }

    public async Task<Exercise> AddAsync(Exercise exercise)
    {
        await _context.Exercises.AddAsync(exercise);
        
        await _context.SaveChangesAsync();
        
        return exercise;
    }

}