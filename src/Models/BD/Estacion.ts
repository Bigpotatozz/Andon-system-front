export class Estacion {
  idEstacion?: number;
  nombre: string;
  estatusActual: number;
  idLineaProduccion: number;

  constructor(
    nombre: string,
    estatusActual: number,
    idLineaProduccion: number,
    idEstacion?: number,
  ) {
    this.nombre = nombre;
    this.estatusActual = estatusActual;
    this.idLineaProduccion = idLineaProduccion;
    this.idEstacion = idEstacion;
  }
}
