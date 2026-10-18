using FluentValidation;
using FitLog.Application.Features.Routines.DTOs;

namespace FitLog.Application.Features.Routines.Validators;

public class CreateRoutineValidator : AbstractValidator<CreateRoutineRequestDto>
{
    
    public CreateRoutineValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre de la rutina no puede estar vacío.")
            .MinimumLength(4).WithMessage("El nombre de la rutina debe tener al menos 4 caracteres.")
            .MaximumLength(100).WithMessage("El nombre de la rutina es demasiado larga.");
    }
}