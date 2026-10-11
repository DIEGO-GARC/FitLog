using Microsoft.EntityFrameworkCore;
using FitLog.Domain.Entities;

namespace FitLog.Infrastructure.Data;

// Clase de contexto de la base de datos
public class FitLogDbContext : DbContext
{
    // Constructor
    public FitLogDbContext(DbContextOptions<FitLogDbContext> options) : base(options) { }

    // Representación de tabla Exercises
    public DbSet<Exercise>  Exercises { get; set; }
    
    // Representación de la tabla Routines
    public DbSet<Routine> Routines { get; set; }
}