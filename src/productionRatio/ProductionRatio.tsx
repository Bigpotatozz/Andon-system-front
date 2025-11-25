import { HeaderTurno } from "@/components/myComponents/HeaderTurno";
import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";

export const ProductionRatio = () => {
  const [tiempoLunch, setTiempoLunch] = useState(0);
  const [tiempoBreak, setTiempoBreak] = useState(0);
  const [tiempoParo, setTiempoParo] = useState(0);
  const [tiempoPQ, setTiempoPQ] = useState(0);
  const [cicleTime, setCicleTime] = useState(0);

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
      const tiempo = `${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
      //Se establece el nuevo tiempo (hora)
      setHora(tiempo);
    }, 1000);
    //Se limpia la memoria cuando el componente no se renderice
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <HeaderTurno turno="Primero turno"></HeaderTurno>

      <div className="m-2 rounded-md border border-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Registro de tiempos
            </h2>
          </div>
          <div
            className="flex items-center gap-x-2"
            style={{ width: "fit-content" }}
          >
            <p>Cicle time (seg):</p>
            <TextInput type="number" style={{ width: "80px" }} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 items-center gap-4 text-center">
          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo de lunch:
            </p>
            <TextInput type="number" />
          </div>
          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo de break:
            </p>
            <TextInput type="number" />
          </div>

          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo de paro:
            </p>
            <TextInput type="number" />
          </div>

          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo PQ Time / KYT:
            </p>
            <TextInput type="number" />
          </div>
        </div>

        <div className="mt-8">
          <Button color="green" style={{ width: "100%" }}>
            Guardar
          </Button>
        </div>
      </div>

      <div className="m-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resetear datos de producción
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Esta acción eliminará todos los datos actuales
            </p>
          </div>
          <Button color="red">Resetear</Button>
        </div>
      </div>

      <div className="m-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activar production ratio
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Esta accion activara el production ratio
            </p>
          </div>
          <Button color="blue">Activar</Button>
        </div>
      </div>

      <div className="m-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resetar información
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Esta accion reseteara toda la información previamente puesta
            </p>
          </div>
          <Button color="yellow">Resetear</Button>
        </div>
      </div>
    </>
  );
};
