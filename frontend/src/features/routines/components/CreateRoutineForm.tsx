import {useState, type FormEvent} from 'react'
import type { Routine } from '../types/routine.types'
import { createRoutineAsync, extractMessageErrorBackend } from '../api/routinesApi'

interface CreateRoutineFormProps {
    onCreatedRoutine: (newRoutine: Routine) => void;
    onCancel: () => void;
}


export function CreateRoutineForm({ onCreatedRoutine, onCancel }: CreateRoutineFormProps) {

    const [name, setName] = useState<string>('')
    const [saving, setSaving] = useState<boolean>(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
        e.preventDefault()

        try {
            setSaving(true)
            setServerError(null)

            const createdRoutine = await createRoutineAsync({ name })

            setName('')
            onCreatedRoutine(createdRoutine)
        } catch (error) {

            const realNetMessage = extractMessageErrorBackend(error)
            console.error('Error al crear la rutina:', error, realNetMessage)
            setServerError(realNetMessage)
        } finally {
            setSaving(false)
        }
    }

    return (

        <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-md border border-orange-500/30 rounded-xl p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold tracking-tight text-white">Registrar Nuevo Hábito Global</h2>
                <span className="text-xs font-mono text-neutral-400 bg-black/40 px-2 py-1 rounded border border-white/10">
                    POST /api/routines
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Escribe una nueva rutina..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={saving}
                    className="flex-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 disabled:opacity-60 transition-colors"
                />
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm px-5 py-2.5 rounded-lg cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {saving ? 'Enviando...' : 'Guardar'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white/[0.06] hover:bg-white/10 text-neutral-200 text-sm px-4 py-2.5 rounded-lg border border-white/10 cursor-pointer transition-colors"
                >
                    Cancelar
                </button>
            </div>

            {/* Banner que muestra literalmente las reglas de FluentValidation que fallaron en .NET */}
            {serverError && (
                <div className="mt-4 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
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
                    <span><strong>Rechazo del Servidor (.NET FluentValidation):</strong> {serverError}</span>
                </div>
            )}
        </form>

    )

}
