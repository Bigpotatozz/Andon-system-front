import { useEffect, useState } from "react";

type LineaCardProps = {
  nombre: string;
  estatus: number;
  tiempo: string;
  color: string;
};

export const LineaCard = ({
  nombre,
  estatus,
  tiempo,
  color,
}: LineaCardProps) => {
  const [colorLocal, setColor] = useState("#49FF00");

  useEffect(() => {
    switch (estatus) {
      case 0:
        setColor("#49FF00");
        break;
      case 1:
        setColor("#49FF00");
        break;
      case 2:
        setColor("#FBFF00");
        break;
      case 3:
        setColor("#FF9300");
        break;
      case 4:
        setColor("#FF0000");
        break;
      case 5:
        setColor("#0046FF");
        break;
      case 6:
        setColor("#7B542F");
        break;
      case 7:
        setColor("#3338A0");
        break;
      case 8:
        setColor("#2DCDDF");
        break;
      case 9:
        setColor("#B6EB7A");
        break;
      case 10:
        setColor("#F6ACC8");
        break;
      default:
        setColor("#49FF00");
        break;
    }
  }, [estatus]);

  return (
    <>
      <div
        className="cardContainer align-center m-2 flex w-50 flex-col items-center justify-center rounded-md border-1 border-solid md:w-80 lg:w-50"
        style={{ background: colorLocal }}
      >
        <h2 className="text-8xl">{nombre}</h2>
        <p className="text-xl">{estatus}</p>
        <p className="text-lg">{tiempo}</p>
        <br></br>
      </div>
    </>
  );
};
