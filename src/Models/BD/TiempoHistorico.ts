export class TiempoHistorico {
  idTiempoHistorico?: number;
  fecha: string;
  inicio: string;
  final: string;
  total: number;
  idTiempo: number;

  constructor(
    fecha: string,
    inicio: string,
    final: string,
    total: number,
    idTiempo: number,
    idTiempoHistorico?: number,
  ) {
    this.fecha = fecha;
    this.inicio = inicio;
    this.final = final;
    this.total = total;
    this.idTiempo = idTiempo;
    this.idTiempoHistorico = idTiempoHistorico;
  }
}
