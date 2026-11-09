import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import type { Routine } from '../types/routine.types'
import { createRoutineAsync, extractMessageErrorBackend } from '../api/routinesApi'
import { createRoutineGlobalSchema, type CreateRoutineGlobalSchemaType } from '../schemas/routine.schema'


interface CreateRoutineFormProps {
    onCreatedRoutine: (newRoutine: Routine) => void;
    onCancel: () => void;
}


export function CreateRoutineForm({ onCreatedRoutine, onCancel }: CreateRoutineFormProps) {

  // Estado para almacenar el mensaje exacto que devuelva .NET si rechaza la petición
    const [serverError, setServerError] = useState<string | null>(null)

    // --- CONEXIÓN DEL ARTEFACTO DE VALIDACIÓN SINTÁCTICA EN TIEMPO REAL ---
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<CreateRoutineGlobalSchemaType>({
        resolver: zodResolver(createRoutineGlobalSchema),
        mode: 'onChange', // Evalúa cada tecla mientras el usuario escribe
        defaultValues: {
            name: '',
        },
    })

    // Solo se ejecuta cuando el Artefacto Zod garantiza que el dato está 100% limpio
    const processCleanSubmission = async (validatedData: CreateRoutineGlobalSchemaType) => {
        try {
            setServerError(null)

            const createdRoutine = await createRoutineAsync(validatedData)

            reset()
            onCreatedRoutine(createdRoutine)
        } catch (error) {
            // Si .NET rechaza la operación (ej. Regla adicional en FluentValidation o Duplicado en BD),
            // extraemos y mostramos el mensaje exacto enviado por el Backend
            const explicitNetMessage = extractMessageErrorBackend(error)
            console.error('Rechazo reportado por el Backend .NET:', error)
            setServerError(explicitNetMessage)
        }
    }

    return (

        <form 
            onSubmit={handleSubmit(processCleanSubmission)} 
            className="bg-white/[0.04] backdrop-blur-md border border-orange-500/30 rounded-xl p-5 mb-8"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Registrar Nuevo Hábito en el Catálogo Global
                </h2>
                <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 bg-black/40 px-2.5 py-1 rounded border border-white/10">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 text-orange-400"
                    >
                        <path d="M10 2.5 4 5v4.5c0 3.6 2.5 6.4 6 8 3.5-1.6 6-4.4 6-8V5l-6-2.5Z" />
                    </svg>
                    Esquema Zod + FluentValidation .NET
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Ej. Diseñar diagramas Entidad-Relación en 3FN..."
                        disabled={isSubmitting}
                        autoFocus
                        {...register('name', {
                            onChange: () => {
                                if (serverError) setServerError(null)
                            },
                        })}
                        className={`w-full bg-black/40 backdrop-blur-md border rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none disabled:opacity-60 transition-colors ${
                            errors.name 
                                ? 'border-yellow-400/70 focus:border-yellow-300'
                                : serverError
                                ? 'border-red-500/60 focus:border-red-400'
                                : 'border-white/10 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30'
                        }`}
                    />
                </div>

                <div className="flex items-center gap-2 self-start">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm px-5 py-2.5 rounded-lg border border-transparent transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:bg-white/[0.04] disabled:text-neutral-500 disabled:border-white/10 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Guardando en BD...' : 'Guardar en PostgreSQL'}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="bg-white/[0.06] hover:bg-white/10 text-neutral-200 font-medium text-sm px-4 py-2.5 rounded-lg border border-white/10 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>
                </div>
            </div>

            {/* 1. Retroalimentación Sintáctica Instantánea (Zod MIENTRAS ESCRIBE) */}
            {errors.name && (
                <p className="text-yellow-300 text-xs mt-2.5 font-medium flex items-center gap-1.5">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        className="w-3.5 h-3.5 shrink-0"
                    >
                        <circle cx="10" cy="10" r="7.5" />
                        <path d="M10 6v4.5M10 13.5h.01" />
                    </svg>
                    <span><strong>Validación en vivo:</strong> {errors.name.message}</span>
                </p>
            )}

            {/* 2. Retroalimentación del Servidor (Mensaje EXACTO devuelto por .NET FluentValidation) */}
            {serverError && (
                <div className="mt-3 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        className="w-4 h-4 shrink-0"
                    >
                        <path d="M10 2.5 4 5v4.5c0 3.6 2.5 6.4 6 8 3.5-1.6 6-4.4 6-8V5l-6-2.5Z" />
                    </svg>
                    <span><strong>Respuesta del Backend (.NET):</strong> {serverError}</span>
                </div>
            )}
        </form>
    )

}
