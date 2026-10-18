using FluentValidation;
using FitLog.Application.Features.Exercises.DTOs;

namespace FitLog.Application.Features.Exercises.Validators;

// Clase de validador para la solicitud de actualización de un ejercicio mediante su id
public class UpdateExerciseValidator : AbstractValidator<UpdateExerciseRequestDto>
{
    public UpdateExerciseValidator() {
        
        // Creando la regla para el nuevo nombre
        RuleFor(x => x.NewName)
            .NotEmpty().WithMessage("El nombre del ejercicio no puede estar vacío.")
            .MinimumLength(4).WithMessage("El ejercicio debe tener al menos 4 caracteres.")
            .MaximumLength(100).WithMessage("El ejercicio es demasiado largo.");

        // Creando regla para el id
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("El ID del ejercicio no puede estar vacío.")
            .GreaterThan(0).WithMessage("El ID del ejercicio debe ser  mayor a 0.");
        
        RuleFor(x => x.NewRoutineId)
            .GreaterThan(0).WithMessage("El ID del ejercicio debe ser  mayor a 0.");
        
    }
}