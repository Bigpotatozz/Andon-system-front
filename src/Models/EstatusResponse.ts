export class EstatusResponse {
  constructor(
    public idDetalleEstatus: number,
    public idEstatus: number,
    public idLineaProduccion: number,
    public nombre: string,
    public prioridad: number,
    public color: string,
    public cancion: string,
    public estatusRealTime: number | null,
  ) {}
}
