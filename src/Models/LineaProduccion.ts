export class LineaProduccion {
  constructor(
    public idLineaProduccion: string,
    public nombre: string,
    public estatusActual: number,
    public idDetalle: number,
    public idEstatus: number,
    public idTiempo: number,
    public prioridad: number,
    public color: string,
    public cancion: string,
  ) {}
}
