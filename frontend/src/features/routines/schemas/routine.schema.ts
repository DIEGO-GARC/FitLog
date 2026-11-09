
import { z } from 'zod'

// Artefacto Declarativo de Validación Sintáctica (Espejo de FluentValidation en .NET)
export const createRoutineGlobalSchema = z.object({
    name: z
        .string()
        .trim() // Sanitiza espacios en blanco al inicio y al final
        .min(1, 'El nombre de la rutina no puede estar vacío.')
        .min(3, 'La rutina debe tener al menos 3 caracteres.')
        .max(100, 'El nombre no puede superar los 100 caracteres permitidos en PostgreSQL.')
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,()-]+$/,
            'La rutina contiene caracteres especiales no permitidos.'
        ),
})

export type CreateRoutineGlobalSchemaType = z.infer<typeof createRoutineGlobalSchema>