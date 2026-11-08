using DotNetEnv;
using FitLog.Application;
using FitLog.Infrastructure;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection") 
                       ?? throw new InvalidOperationException("Falta la cadena de conexión.");

builder.Services.AddApplication();

builder.Services.AddInfrastructure(connectionString);

var corsAllowedOrigins = Environment.GetEnvironmentVariable("Cors_Allowed_Origins");

builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCorsHabitForge", policy =>
    {
        // Separamos por coma por si existen múltiples orígenes (ej. localhost + https://*.unah.edu.hn)
        var origins = corsAllowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        policy.WithOrigins(origins)
            .SetIsOriginAllowedToAllowWildcardSubdomains() // Habilita comodines de subdominio (ej. https://*.unah.edu.hn)
            .AllowAnyHeader()                              // Autoriza encabezados JSON y futuros Tokens JWT
            .AllowAnyMethod();                             // Autoriza verbos GET y Preflights (POST, PUT, DELETE)
    });
});

builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference();
}

app.UseCors("PoliticaCorsHabitForge");

app.UseHttpsRedirection();

app.MapControllers();
app.Run();

