using FluentValidation;
using FitLog.Application.Features.Routines.DTOs;

namespace FitLog.Application.Features.Routines.Validators;

// Clase de validador para la solicitud de actualización de una rutina mediante su id
public class UpdateRoutineValidator : AbstractValidator<UpdateRoutineRequestDto>
{
    
    public UpdateRoutineValidator() {
        
        // Creando la regla para el nuevo nombre
        RuleFor(x => x.NewName)
            .NotEmpty().WithMessage("El nombre de la rutina no puede estar vacío.")
            .MinimumLength(4).WithMessage("El nombre de la rutina debe tener al menos 4 caracteres.")
            .MaximumLength(100).WithMessage("El nombre de la rutina es demasiado larga.");

        // Creando regla para el id
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("El ID de la rutina no puede estar vacío.")
            .GreaterThan(0).WithMessage("El ID de la rutina debe ser  mayor a 0.");
        
    }
    
}