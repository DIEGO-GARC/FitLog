using Microsoft.EntityFrameworkCore;
using FitLog.Infrastructure.Data;
using FitLog.Domain.Entities;
using FitLog.Application.Interfaces;


namespace FitLog.Infrastructure.Repositories;

// Clase repositorio de rutinas
public class RoutineRepository : IRoutineRepository
{
    private readonly FitLogDbContext _context;
    
    public RoutineRepository(FitLogDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Routine>> GetAllAsync()
    {
        return await _context.Routines.ToListAsync(); 
    }
}