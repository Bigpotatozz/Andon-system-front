import { convertirSegundos } from "@/helpers/conversorSegundos";
import { useEffect, useState } from "react";

//Componente que representa cada uno de los estatus en el tablero general

//Props de la card
type LineaCardProps = {
  nombre: string;
  estatus: number;
  tiempo: string;
  color: string;
};
//Componente
export const LineaCard = ({
  nombre,
  estatus,
  tiempo,
  color,
}: LineaCardProps) => {
  //Se pasa el tiempo a un state para usarlo
  const [time, setTime] = useState(tiempo);
  const [localTime, setLocalTime] = useState(0);

  //si el tiempo (prop) cambia le seteamos el nuevo valor al estado
  useEffect(() => {
    setTime(tiempo);
    setLocalTime(0);
  }, [tiempo]);

  //Cada que se recompone el componente se inicia el interval por segundo y se va sumando
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTime((prev) => prev + 1);

      setLocalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);
  return (
    <>
      <div
        className="align-center m-0.5 flex w-80 flex-col items-center justify-center rounded-md border-1 border-solid text-black md:w-50 lg:w-80"
        style={{ background: color }}
      >
        <h2 className="text-8xl">{nombre}</h2>
        <p className="text-xl">{estatus}</p>
        <p className="text-lg">{convertirSegundos(parseInt(time))}</p>
        <p className="text-lg">{convertirSegundos(localTime)}</p>
        <br></br>
      </div>
    </>
  );
};
