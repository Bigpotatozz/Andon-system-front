import axios from "axios";
import { LineaCard } from "./components/LineaCard";
import { useEffect, useRef, useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";
import { convertirSegundos } from "@/helpers/conversorSegundos";

//En el tablero general puedes ver la informacion general de todas las lineas de produccion

export const TableroGeneral = () => {
  //Inicializacion de los estados que se recibiran de la API
  const [estados, setEstados] = useState<any[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  //Funcion que hace peticion a la api y guarda la respuesta en el state estados
  const obtenerEstatus = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/estatus/obtenerEstatus",
    );

    const datosNuevos = response.data.response;
    setEstados(datosNuevos);
    let audioNuevo = "";

    let max = 0;
    datosNuevos.forEach((estado) => {
      if (estado.prioridad > max) {
        max = estado.prioridad;
        audioNuevo = estado.cancion;
      }
    });

    if (audioRef.current && audioNuevo) {
      const nuevaRuta = `http://localhost:3000/uploads/${audioNuevo}`;

      if (audioRef.current.src !== nuevaRuta) {
        audioRef.current.src = nuevaRuta;
        audioRef.current.loop = true;
        audioRef.current.play().catch((e) => {
          console.log(e);
        });
      } else {
        console.log("Mismo audio");
      }
    }

    console.log(response.data);
  };
  //Hook que al cargar la pagina hace automaticamente la peticion a la api con la funcion obtenerEstatus
  useEffect(() => {
    obtenerEstatus();
    const loop = setInterval(() => {
      obtenerEstatus();
      console.log("Loop iniciado");
    }, 500);

    return () => clearInterval(loop);
  }, []);

  return (
    <>
      <audio ref={audioRef} hidden></audio>
      <div className="align-center flex w-full flex-col items-center justify-center pt-5">
        <div className="flex flex-wrap justify-center">
          {estados.map((estado) => {
            return (
              <LineaCard
                key={estado.idLineaProduccion}
                nombre={estado.idLineaProduccion}
                estatus={estado.estatusActual ?? 0}
                tiempo={convertirSegundos(estado.total ?? 0)}
                color={estado.color}
              />
            );
          })}
        </div>
        <Link to={"/"}>
          <Button className="me-2 mt-10 rounded-lg bg-blue-700 p-10 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </>
  );
};
