using FitLog.Domain.Entities;

namespace FitLog.Application.Interfaces;

public interface IExerciseRepository
{
    Task<IEnumerable<Exercise>> GetAllAsync();
    Task<Exercise> AddAsync(Exercise exercise);
}