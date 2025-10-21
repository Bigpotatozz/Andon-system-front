import { LineaProduccion } from "./LineaProduccion";

export class TiemposLineaProduccion extends LineaProduccion {
  constructor(
    idLineaProduccion: string,
    nombre: string,
    estatusActual: number,
    idDetalle: number,
    idEstatus: number,
    idTiempo: number,
    prioridad: number,
    color: string,
    cancion: string,
    public fecha: string,
    public inicio: string,
    public final: string,
    public total: number,
  ) {
    super(
      idLineaProduccion,
      nombre,
      estatusActual,
      idDetalle,
      idEstatus,
      idTiempo,
      prioridad,
      color,
      cancion,
    );
  }
}
