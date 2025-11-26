export class Usuario {
  idUsuario?: number;
  correo: string;
  password: string;
  rol: string;

  constructor(
    correo: string,
    password: string,
    rol: string,
    idUsuario?: number,
  ) {
    this.correo = correo;
    this.password = password;
    this.rol = rol;
    this.idUsuario = idUsuario;
  }
}
