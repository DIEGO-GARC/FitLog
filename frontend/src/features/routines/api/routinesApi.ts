
import axios from 'axios' 
import type {Routine, CreateRoutineDto, FluentValidationError} from '../types/routine.types'


const API_BASE_URL = import.meta.env.VITE_API_URL


if (!API_BASE_URL) {
    console.error('Error: La variable de entorno VITE_API_URL no está definida.')
}


export const apiCLient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const getRoutinesAsync = async (): Promise<Routine[]> => {
    const response = await apiCLient.get<Routine[]>('/routines')

    if(!Array.isArray(response.data)) {
        throw new Error('La respuesta del servidor no es un arreglo JSON válido.')
    }

    return response.data
}

export const createRoutineAsync = async (newRoutine: CreateRoutineDto): Promise<Routine> => {
    const response = await apiCLient.post<Routine>('/routines', newRoutine)
    return response.data
}

export const extractMessageErrorBackend = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        // Caso A: El servidor .NET está apagado o el navegador bloqueó por CORS
        if (!error.response) {
            return 'Sin respuesta del servidor (.NET apagado o bloqueo de seguridad CORS en el navegador).'
        }

        const status = error.response.status
        const data = error.response.data

        // Caso B: Arreglo de errores devuelto por FluentValidation en .NET -> [ { propertyName, errorMessage }, ... ]
        if (Array.isArray(data)) {
            const erroresFluent = (data as FluentValidationError[])
                .map((item) => item?.errorMessage)
                .filter((msg): msg is string => typeof msg === 'string' && msg.trim().length > 0)

            if (erroresFluent.length > 0) {
                return `[HTTP ${status}] ${erroresFluent.join(' | ')}`
            }
        }

        // Caso C: El controlador de .NET devolvió un string directo -> BadRequest("Mensaje...")
        if (typeof data === 'string' && data.trim().length > 0) {
            return `[HTTP ${status}] ${data}`
        }

        // Caso D: El servidor devolvió un objeto JSON (ProblemDetails o { error / mensaje })
        if (data && typeof data === 'object') {
            const obj = data as Record<string, unknown>

            if ('errors' in obj && obj.errors && typeof obj.errors === 'object') {
                const errorList = Object.values(obj.errors as Record<string, string[]>).flat()
                if (errorList.length > 0) {
                    return `[HTTP ${status}] ${errorList.join(' | ')}`
                }
            }

            const explicitMessage = obj.error || obj.mensaje || obj.message || obj.detail || obj.title
            if (typeof explicitMessage === 'string' && explicitMessage.trim().length > 0) {
                return `[HTTP ${status}] ${explicitMessage}`
            }
        }

        return `[HTTP ${status}] El servidor .NET rechazó la operación.`
    }

    return error instanceof Error ? error.message : 'Error inesperado en la aplicación.'
}