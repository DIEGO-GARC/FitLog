using Microsoft.EntityFrameworkCore;
using FitLog.Domain.Entities;

namespace FitLog.Infrastructure.Data;

public class FitLogDbContext : DbContext
{
    public FitLogDbContext(DbContextOptions<FitLogDbContext> options) : base(options) { }

    public DbSet<Exercise>  Exercises { get; set; }
}