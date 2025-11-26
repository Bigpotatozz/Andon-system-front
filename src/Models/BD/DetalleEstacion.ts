export class DetalleEstacion {
  idDetalleEstacion?: number;
  idEstatus: number;
  idEstacion: number;
  idTiempo: number;

  constructor(
    idEstatus: number,
    idEstacion: number,
    idTiempo: number,
    idDetalleEstacion?: number,
  ) {
    this.idEstatus = idEstatus;
    this.idEstacion = idEstacion;
    this.idTiempo = idTiempo;
    this.idDetalleEstacion = idDetalleEstacion;
  }
}
