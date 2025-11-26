export class Turno {
  idTurno?: number;
  nombreTurno: string;
  horaInicio: string;
  horaFin: string;
  objetivoProduccion: number;
  progresoProduccion: number;
  idLineaProduccion: number;

  constructor(
    nombreTurno: string,
    horaInicio: string,
    horaFin: string,
    objetivoProduccion: number,
    progresoProduccion: number,
    idLineaProduccion: number,
    idTurno?: number,
  ) {
    this.nombreTurno = nombreTurno;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.objetivoProduccion = objetivoProduccion;
    this.progresoProduccion = progresoProduccion;
    this.idLineaProduccion = idLineaProduccion;
    this.idTurno = idTurno;
  }
}
