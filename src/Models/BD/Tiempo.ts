export class Tiempo {
  idTiempo?: number;
  fecha: string;
  inicio: string;
  final: string;
  total: number;

  constructor(
    fecha: string,
    inicio: string,
    final: string,
    total: number,
    idTiempo?: number,
  ) {
    this.fecha = fecha;
    this.inicio = inicio;
    this.final = final;
    this.total = total;
    this.idTiempo = idTiempo;
  }
}
