import './App.css'
import {useState, useEffect} from 'react'
import {RoutineCard, type RoutineProps} from './components/RoutineCard'

function App() {

  // 1. Casillero #0 en el Heap (Fiber):
  // En cada refresco, useState extrae el arreglo del almacén y lo inyecta en 'rutinas'.
  // 'setRutinas' escribe nuevos datos en ese almacén y dispara un refresco de App().
  const [routines, setRoutines] = useState<RoutineProps[]>([])

  // 2. Casillero #1 en el Heap (Fiber): Controla si mostramos el cartel de espera
  const [loading, setLoading] = useState<boolean>(true)

  // 3. Casillero #2 en el Heap (Fiber): Almacena el texto que el usuario escribe en el buscador
  const [search, setSearch] = useState<string>('')

  // 4. Hook de Ciclo de Vida (useEffect con [] se ejecuta UNA SOLA VEZ tras la Vuelta 1)
  useEffect(() => {
    // Simulamos la latencia de red (1.2 seg) de una consulta al servidor
    const timer = setTimeout(() => {
      const simulatedDataBD: RoutineProps[] = [
        { id: 1, nombre: 'Día de Brazo' },
        { id: 2, nombre: 'Día de Piernas' },
        { id: 3, nombre: 'Día de Pecho' },
        { id: 4, nombre: 'Día de Espalda' },
        { id: 5, nombre: 'Día de Cardio' },
      ]

      // Guardamos en el Almacén Global y ordenamos a React ejecutar la Vuelta 2 (Re-render)
      setRoutines(simulatedDataBD)
      setLoading(false)
    }, 1200)

    // Limpieza de memoria si el componente se desmonta antes de que termine el tiempo
    return () => clearTimeout(timer)
  }, [])

  // Variable calculada en cada refresco usando los datos re-inyectados en 'rutinas' y 'busqueda'
  const filteredRoutines = routines.filter((routine) =>
    routine.nombre.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row">

      {/* Fondo ambiental: un único resplandor naranja muy tenue en la esquina superior derecha.
          Es lo que se "ve a través" de las superficies translúcidas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(55%_45%_at_85%_0%,rgba(249,115,22,0.16),transparent_70%)]"
      />

      {/* =====================================================================
          1. COLUMNA IZQUIERDA: MENÚ CORPORATIVO (SIDEBAR)
          Fijo de 256px (w-64) en Escritorio | Oculto en Celular
         ===================================================================== */}
      <aside className="relative z-10 hidden md:flex md:w-64 md:flex-col bg-black/40 backdrop-blur-xl border-r border-white/10 justify-between p-5 shrink-0">
        <div>
          {/* Identidad de Marca */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-sm text-black">
              FL
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">FitLog</span>
          </div>

          {/* Menú de Navegación del Sistema */}
          <nav className="space-y-1.5">
            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2.5 bg-white/[0.06] text-white rounded-lg font-medium text-sm border border-white/10">
              <span className="flex items-center gap-3">Rutinas Activas</span>
              {/* Este contador lee la variable re-inyectada: pasa de 0 (Vuelta 1) a 6 (Vuelta 2) */}
              <span className="bg-orange-500/15 text-orange-400 text-xs px-2 py-0.5 rounded-full tabular-nums">
                {routines.length}
              </span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-neutral-500 rounded-lg font-medium text-sm cursor-not-allowed">
            Mis Rutinas (Más adelante)
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-neutral-500 rounded-lg font-medium text-sm cursor-not-allowed">
            Mis Ejercicios(Más adelante)
            </a>
          </nav>
        </div>

        {/* Estado de Sesión (Se conectará con JWT en la Unidad 3) */}
        <div className="p-3.5 bg-white/[0.04] rounded-xl border border-white/10">
          <p className="text-xs text-neutral-400 mb-1">Estado de Seguridad</p>
          <p className="flex items-center gap-2 text-sm font-semibold text-orange-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Modo Invitado
          </p>
        </div>
      </aside>

      {/* =====================================================================
          2. CABECERA MÓVIL (Visible únicamente en teléfonos celulares: md:hidden)
         ===================================================================== */}
      <header className="md:hidden sticky top-0 z-20 bg-black/50 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center font-bold text-sm text-black">
            FL
          </div>
          <span className="font-semibold text-lg text-white">FitLog</span>
        </div>
        <span className="text-xs bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-md border border-orange-500/20 font-medium">
          Invitado
        </span>
      </header>

      {/* =====================================================================
          3. ÁREA CENTRAL DE CONTENIDO (WORKSPACE)
         ===================================================================== */}
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
          <button className="bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors self-start sm:self-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
            + Nueva Rutina
          </button>
        </div>

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

        {/* RENDERIZADO CONDICIONAL: Vuelta 1 (cargando = true) vs Vuelta 2 (cargando = false) */}
        {loading ? (
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-12 text-center">
            <p className="text-orange-400 font-medium animate-pulse text-lg">
              Sincronizando catálogo desde el Almacén de Estado...
            </p>
            <p className="text-neutral-500 text-xs mt-2">
              Ejecutando Vuelta 1 (Montaje inicial y disparo de useEffect)
            </p>
          </div>
        ) : (
          /* MAPEO DINÁMICO AL DOM: Recorremos los datos re-inyectados en la variable 'filteredRoutines' */
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRoutines.map((routine) => (
              <RoutineCard 
                key={routine.id} 
                id={routine.id} 
                nombre={routine.nombre} 
              />
            ))}
          </section>
        )}

      </main>
    </div>
  )
}

export default App