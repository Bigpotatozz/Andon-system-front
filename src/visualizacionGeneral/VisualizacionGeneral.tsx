import { use, useEffect, useState } from "react";
import { Plan } from "./components/Plan";
import PlanSquare from "./components/PlanSquare";
import { HeaderTurno } from "@/components/myComponents/HeaderTurno";
import axios from "axios";

const VisualizacionGeneral = () => {
  const [estatus, setEstatus] = useState(null);
  const [color, setColor] = useState("");

  const [planHora, setPlanHora] = useState(0);
  const [cicleTime, setCicleTime] = useState(0);
  const [planAcumulado, setPlanAcumulado] = useState(0);

  const [inicioTurno, setInicioTurno] = useState(null);
  const obtenerProductionRatio = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/estatus/obtenerProductionRatio",
    );

    setPlanHora(response.data.productionRatio[0].objetivoProduccion);

    setCicleTime(
      Math.round(3600 / response.data.productionRatio[0].objetivoProduccion),
    );
    console.log(response.data.productionRatio[0]);
  };

  const obtenerEstatus = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/estatus/obtenerEstatusRatio",
    );

    console.log(response.data.response);

    setEstatus(response.data.response[0].nombre);
    setColor(response.data.response[0].color);
  };

  useEffect(() => {
    obtenerEstatus();
    const loop = setInterval(() => {
      obtenerProductionRatio();
      obtenerEstatus();
      console.log("Loop iniciado");
    }, 1000);

    return () => clearInterval(loop);
  }, []);

  useEffect(() => {
    const planAcumuladoInterval = setInterval(() => {
      setPlanAcumulado((prev) => prev + 1);

      console.log(planAcumulado);
    }, cicleTime * 1000);
    return () => clearInterval(planAcumuladoInterval);
  }, [cicleTime]);
  return (
    <div>
      <HeaderTurno turno="Primer turno"></HeaderTurno>

      <div className="flex justify-center">
        <Plan
          texto1="PLAN"
          texto2="HORA"
          contador={`${planHora}`}
          color="#FFFFFF"
        ></Plan>
        <Plan
          texto1="PLAN"
          texto2="ACUMULADO"
          contador={`${planAcumulado}`}
          color="#FFFFFF"
        ></Plan>
      </div>

      <div className="flex justify-center">
        <Plan
          texto1="REAL"
          texto2="HORA"
          contador={`00029`}
          color="#FFFFFF"
        ></Plan>
        <Plan
          texto1="REAL"
          texto2="ACUMULADO"
          contador={`00029`}
          color="#FFFFFF"
        ></Plan>
      </div>

      <div className="flex justify-center">
        <Plan
          texto1="OEE"
          texto2="HORA"
          contador={`000.0%`}
          color="#FF0000"
        ></Plan>
        <Plan
          texto1="OEE"
          texto2="ACUMULADO"
          contador={`000.0%`}
          color="#FF0000"
        ></Plan>
      </div>

      <div className="flex flex-wrap justify-center">
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
      </div>

      <div
        className="m-2 rounded-2xl border border-white p-5"
        style={{ background: color }}
      >
        <h2 className="flex justify-center p-5 text-5xl font-bold text-white">
          {estatus}
        </h2>
      </div>
    </div>
  );
};

export default VisualizacionGeneral;
