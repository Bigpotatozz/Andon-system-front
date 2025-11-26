export class TurnoHistorico {
  idTurnoHistorico?: number;
  nombreTurno: string;
  horaInicio: string;
  horaFin: string;
  objetivoProduccion: number;
  progresoProduccion: number;
  idTurno: number;

  constructor(
    nombreTurno: string,
    horaInicio: string,
    horaFin: string,
    objetivoProduccion: number,
    progresoProduccion: number,
    idTurno: number,
    idTurnoHistorico?: number,
  ) {
    this.nombreTurno = nombreTurno;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.objetivoProduccion = objetivoProduccion;
    this.progresoProduccion = progresoProduccion;
    this.idTurno = idTurno;
    this.idTurnoHistorico = idTurnoHistorico;
  }
}
