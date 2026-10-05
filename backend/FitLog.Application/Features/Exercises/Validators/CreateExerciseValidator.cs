using FluentValidation;
using FitLog.Application.Features.Exercises.DTOs;

namespace FitLog.Application.Features.Exercises.Validators;

public class CreateExerciseValidator : AbstractValidator<CreateExerciseRequestDto>
{
    
    public CreateExerciseValidator() {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre del ejercicio no puede estar vacío.")
            .MinimumLength(4).WithMessage("El ejercicio debe tener al menos 4 caracteres.")
            .MaximumLength(100).WithMessage("El ejercicio es demasiado largo.");
    }
    
}