import { useEffect } from "react";

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
  useEffect(() => {}, [estatus]);

  return (
    <>
      <div
        className="cardContainer align-center m-2 flex w-50 flex-col items-center justify-center rounded-md border-1 border-solid text-black md:w-80 lg:w-50"
        style={{ background: color }}
      >
        <h2 className="text-8xl">{nombre}</h2>
        <p className="text-xl">{estatus}</p>
        <p className="text-lg">{tiempo}</p>
        <br></br>
      </div>
    </>
  );
};
