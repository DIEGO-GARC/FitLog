import {useState, useEffect} from 'react'
import type { Routine } from '../types/routine.types'
import { getRoutinesAsync} from '../api/routinesApi'
import { RoutineCard } from './RoutineCard'
import { CreateRoutineForm } from './CreateRoutineForm'

export function RoutinesCatalogView() {

    const [routines, setRoutines] = useState<Routine[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [networkError, setNetworkError] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false)

    useEffect(() => {
        getRoutinesAsync().then((data) => {
            setRoutines(data)
            setNetworkError(null)
        })
        .catch((error) => {
            console.error('Fallo en la comunicación HTTP con .NET:', error)
            setNetworkError('La comunicación fue rechazada o bloqueada por políticas de seguridad (CORS). Revisa la consola del navegador (F12) y verifica que el Backend autorice al origen http://localhost:5173.')
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])


    const handleCreateRoutine = (newRoutine: Routine) => {
        setRoutines((prevRoutines) => [...prevRoutines, newRoutine])
        setShowCreateForm(false)
    }


    const filteredRoutines = routines.filter((routine) =>
        routine.name.toLowerCase().includes(search.toLowerCase())
    )


     // --- ZONA 4: RENDERIZADO EXCLUSIVO DEL CATÁLOGO ---
    return (
    <main className="relative z-10 flex-1 p-6 md:p-10 overflow-y-auto">
            
            {/* Barra Superior de Título y Acción Principal */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-white/10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Rutinas Activas</h1>
                    <p className="text-neutral-400 text-sm mt-1">
                    Explora las rutinas activas registradas en la tabla <code className="text-orange-400 font-mono">RutinasActivas</code>.
                    </p>
                </div>

                {/* Botón preparado para el Laboratorio de Integración POST */}
                {!showCreateForm && (
                <button 
                    onClick={() => setShowCreateForm(true)}
                    className="bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors self-start sm:self-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                    + Nueva Rutina
                </button>
                )}
            </div>

            {/* Renderizado condicional del Formulario POST */}
            {showCreateForm && (
                <CreateRoutineForm 
                onCreatedRoutine={handleCreateRoutine}
                onCancel={() => setShowCreateForm(false)}
                />
            )}


            {/* Buscador Reactivo: Cada tecla ejecuta setBusqueda(), guarda en el Almacén y refresca App() */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
                <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                >
                <circle cx="9" cy="9" r="5.5" />
                <path d="M13.5 13.5 17 17" />
                </svg>
                <input
                type="text"
                placeholder="Filtrar rutinas en el catálogo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                />
            </div>
            <span className="text-xs text-neutral-400">
                Mostrando <strong className="text-white tabular-nums">{filteredRoutines.length}</strong> de {routines.length} registros en memoria
            </span>
            </div>

            {/* 1. Estado de Carga */}
            {loading && (
                <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-12 text-center">
                    <p className="text-orange-400 font-medium animate-pulse text-lg">
                    Consultando endpoint GET /api/habitos en .NET..
                    </p>
                </div>
            )}
            
            {/* 2. Estado de Error de Red o Bloqueo CORS */}
            {!loading && networkError && (
                <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-12 text-center">
                    <p className="text-orange-400 font-medium animate-pulse text-lg">
                    Error de conumicación Full-Stack
                    </p>
                    <p className="text-orange-400 font-medium animate-pulse text-lg">
                    {networkError}
                    </p>
                </div>
            )}
            
            {/* MAPEO DINÁMICO AL DOM: Recorremos los datos re-inyectados en la variable 'filteredRoutines' */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRoutines.map((routine) => (
                <RoutineCard 
                    key={routine.id} 
                    id={routine.id} 
                    name={routine.name} 
                />
                ))}
            </section>

    </main>
)

}