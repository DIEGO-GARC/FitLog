export interface RoutineProps {
    id: number;
    nombre: string;
}

export function RoutineCard({ id, nombre }: RoutineProps) {
    return (
        <article className="group relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-orange-500/50 hover:bg-white/[0.07] transition-colors">
            {/* Retazo naranja: una línea fina que se alarga al pasar el cursor */}
            <span
                aria-hidden="true"
                className="absolute top-0 left-5 h-px w-8 bg-orange-500 transition-all duration-300 group-hover:w-14"
            />

            <div>
                {/* Cabecera de la Tarjeta: Badge con ID de Base de Datos */}
                <div className="flex items-center justify-between mb-3">
                    <span className="bg-orange-500/10 text-orange-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-orange-500/20 tabular-nums">
                        ID #{id}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">Rutinas de User</span>
                </div>
                
                {/* Nombre de la Rutina */}
                <h3 className="text-lg font-semibold tracking-tight text-white mb-5">
                    {nombre}
                </h3>
            </div>

            {/* Botón de Acción (Se habilitará cuando implementemos Usuarios en la Unidad 3) */}
            <button 
                disabled 
                className="w-full bg-white/[0.03] text-neutral-500 text-sm font-medium py-2.5 px-4 rounded-lg cursor-not-allowed border border-white/10"
            >
                Revisar Rutina (Más adelante)
            </button>
        </article>
    );
}