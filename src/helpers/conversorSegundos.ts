export const convertirSegundos = (totalesSegundos: number) => {
  const dias = Math.floor(totalesSegundos / 86400);
  const horas = Math.floor((totalesSegundos % 86400) / 3600);
  const minutos = Math.floor((totalesSegundos % 3600) / 60);
  const segundos = totalesSegundos % 60;

  const segundosToString =
    `${dias.toString().padStart(2, "0")}:` +
    `${horas.toString().padStart(2, "0")}:` +
    `${minutos.toString().padStart(2, "0")}:` +
    `${segundos.toString().padStart(2, "0")}`;

  return segundosToString;
};
