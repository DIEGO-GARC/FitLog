using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using FitLog.Application.Interfaces;
using FitLog.Infrastructure.Data;
using FitLog.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;

namespace FitLog.Infrastructure;

public static class DependencyInjection
{

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {

        services.AddDbContext<FitLogDbContext>(options =>
            options.UseNpgsql(connectionString));
        
        services.AddScoped<IExerciseRepository, ExerciseRepository>();
        
        return services;

    }

}