import axios from "axios";
import { LineaCard } from "./components/LineaCard";
import { useEffect, useState } from "react";
import type { EstatusResponse } from "../Models/EstatusResponse";

export const TableroGeneral = () => {
  const [estados, setEstados] = useState<EstatusResponse[]>([]);

  const obtenerEstatus = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/estatus/obtenerEstatus",
    );

    setEstados(response.data.response[0]);
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
      <div className="flex flex-wrap">
        {estados.map((estado, index) => {
          return (
            <LineaCard
              key={estado.idLineaProduccion}
              nombre={estado.nombre}
              estatus={estado.estatusRealTime ?? 0}
              tiempo={"adadad"}
              color={estado.color}
            />
          );
        })}
      </div>
    </>
  );
};
