export class LineaProduccion {
  idLineaProduccion?: number;
  nombre: string;

  constructor(nombre: string, idLineaProduccion?: number) {
    this.nombre = nombre;
    this.idLineaProduccion = idLineaProduccion;
  }
}
