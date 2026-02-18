import { create } from "zustand";

interface TurnoState {
  turno: any;
  actualizarTurno: (nuevoTurno: any) => void;
  limpiarTurno: () => void;
}
export const useTurnoStore = create<TurnoState>((set) => ({
  turno: {
    OEE: null,
    activo: 1,
    fecha: null,
    horaFin: "17:00:00",
    horaInicio: "08:00:00",
    idLineaProduccion: 1,
    idObjetivo: 1,
    idTurno: 1,
    nombreTurno: "mañana",
    objetivoProduccion: 2492,
    objetivoProduccionHora: 277,
    primerPieza: null,
    progresoProduccion: 0,
    progresoProduccionHora: 0,
    ultimaPieza: null,
  },

  actualizarTurno: (turno: any) => {
    console.log(turno);
    set({ turno });
  },

  limpiarTurno: () => {
    set({ turno: null });
  },
}));
