import axios from "axios";
import { LineaCard } from "./components/LineaCard";
import { useEffect, useRef, useState } from "react";
import type { EstatusResponse } from "../Models/EstatusResponse";
import { Button } from "flowbite-react";
import { Link } from "react-router";

export const TableroGeneral = () => {
  const [estados, setEstados] = useState<EstatusResponse[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const obtenerEstatus = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/estatus/obtenerEstatus",
    );

    setEstados(response.data.response);
    console.log(response.data);
  };

  useEffect(() => {
    obtenerEstatus();
    const loop = setInterval(() => {
      obtenerEstatus();
      console.log("Loop iniciado");
    }, 10000);

    return () => clearInterval(loop);
  }, []);

  return (
    <>
      <div className="align-center flex w-full flex-col items-center justify-center p-5">
        <div className="flex flex-wrap">
          {estados.map((estado, index) => {
            return (
              <LineaCard
                key={estado.idLineaProduccion}
                nombre={estado.idLineaProduccion}
                estatus={estado.estatusActual ?? 0}
                tiempo={"adadad"}
                color={estado.color}
              />
            );
          })}
        </div>
        <Link to={"/"}>
          <Button className="me-2 rounded-lg bg-blue-700 p-10 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </>
  );
};
