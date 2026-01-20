import { convertirSegundos } from "@/helpers/conversorSegundos";
import { useEffect, useRef, useState } from "react";

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
  const [time, setTime] = useState(tiempo);

  useEffect(() => {
    setTime(tiempo);
  }, [tiempo]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);
  return (
    <>
      <div
        className="align-center m-1 flex w-80 flex-col items-center justify-center rounded-md border-1 border-solid text-black md:w-80 lg:w-80"
        style={{ background: color }}
      >
        <h2 className="text-8xl">{nombre}</h2>
        <p className="text-xl">{estatus}</p>
        <p className="text-lg">{convertirSegundos(parseInt(time))}</p>
        <br></br>
      </div>
    </>
  );
};
