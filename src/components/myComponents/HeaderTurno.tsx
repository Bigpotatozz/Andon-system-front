import { useEffect, useState } from "react";

type FechaProps = {
  turno: string;
};

export const HeaderTurno = ({ turno }: FechaProps) => {
  //CODIGO PARA OBTENER LA FECHA
  //Crea un nuevo estado con la fecha actual
  const [fecha, setFecha] = useState(new Date().toLocaleDateString("en-GB"));
  //Crea un estado con un string donde se guardara la hora
  const [hora, setHora] = useState("");
  //Se ejecuta un useEffect para que se realize al renderizar la pagina
  useEffect(() => {
    //Se crea un interval que se repite cada segundo
    const intervalId = setInterval(() => {
      //Se crea una nueva fecha
      const date = new Date();
      //Se pone la nueva fecha en el estado de fecha
      setFecha(date.toLocaleDateString("en-GB"));
      //A esa nueva fecha se le obtiene las horas, minutos y segundos y se pone como string
      const tiempo = `${date.getHours().toString().padStart(2, "0")}: ${date.getMinutes().toString().padStart(2, "0")}: ${date.getSeconds().toString().padStart(2, "0")}`;
      //Se establece el nuevo tiempo (hora)
      setHora(tiempo);
    }, 1000);
    //Se limpia la memoria cuando el componente no se renderice
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <div className="turno">
          <h2>
            <strong className="text-3xl">Turno:</strong>
          </h2>
          <h2 className="text-2xl font-semibold text-amber-300">{turno}</h2>
        </div>
        <div className="fecha">
          <h3 className="text-xl text-lime-400">{fecha}</h3>
          <h3 className="text-xl text-lime-400">{hora}</h3>
        </div>
      </div>
    </div>
  );
};
