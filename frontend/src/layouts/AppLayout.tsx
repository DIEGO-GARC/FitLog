import type { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
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
            {children}
        </main>

        </div>
    );
}