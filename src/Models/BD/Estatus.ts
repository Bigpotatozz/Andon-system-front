export class Estatus {
  idEstatus?: number;
  nombre: string;
  prioridad: number;
  color: string;
  colorId: number;
  cancion: string;
  tiempoDefinido: number;

  constructor(
    nombre: string,
    prioridad: number,
    color: string,
    colorId: number,
    cancion: string,
    tiempoDefinido: number,
    idEstatus?: number,
  ) {
    this.nombre = nombre;
    this.prioridad = prioridad;
    this.color = color;
    this.colorId = colorId;
    this.cancion = cancion;
    this.tiempoDefinido = tiempoDefinido;
    this.idEstatus = idEstatus;
  }
}
