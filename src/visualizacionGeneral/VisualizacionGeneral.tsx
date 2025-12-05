import { useEffect, useState } from "react";
import { Plan } from "./components/Plan";
import PlanSquare from "./components/PlanSquare";
import { HeaderTurno } from "@/components/myComponents/HeaderTurno";
import axios from "axios";

const VisualizacionGeneral = () => {
  const [turno, setTurno] = useState(0);
  const [turnoNombre, setTurnoNombre] = useState("");
  const [estatus, setEstatus] = useState(null);
  const [color, setColor] = useState("");

  const [planHora, setPlanHora] = useState(0);
  const [cicleTime, setCicleTime] = useState(0);
  const [planAcumulado, setPlanAcumulado] = useState(0);
  const [realHora, setRealHora] = useState(0);

  const [inicioTurno, setInicioTurno] = useState(null);

  const obtenerTurno = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/turno/obtenerTurno",
    );

    console.log("TURNO///////////////////////////");
    console.log(response.data.turno[0]);
    setTurno(response.data.turno[0]);
    setTurnoNombre(response.data.turno[0].nombreTurno);
  };

  const obtenerProductionRatio = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/turno/obtenerProductionRatio",
    );

    setPlanHora(response.data.productionRatio[0].objetivoProduccion);
    setRealHora(response.data.productionRatio[0].progresoProduccion);

    setCicleTime(
      Math.round(3600 / response.data.productionRatio[0].objetivoProduccion),
    );

    convertirTime(
      response.data.productionRatio[0].horaInicio,
      response.data.productionRatio[0].objetivoProduccion,
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

  const convertirTime = (time: string, planHora: number) => {
    const ahora = new Date();
    const [horas, minutos, segundos] = time.split(":").map(Number);

    const turnoInicioCompleto = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      horas,
      minutos,
      segundos,
    );

    const horasTranscurridas =
      (ahora.getTime() - turnoInicioCompleto.getTime()) / (1000 * 60 * 60);

    console.log(horasTranscurridas);
    setPlanAcumulado(Math.floor(planHora * horasTranscurridas));
  };

  useEffect(() => {
    obtenerTurno();
    obtenerEstatus();
    const loop = setInterval(() => {
      obtenerProductionRatio();
      console.log(planAcumulado);
      obtenerEstatus();
      console.log("Loop iniciado");
    }, 1000);

    return () => clearInterval(loop);
  }, []);

  return (
    <div>
      <HeaderTurno turno={turnoNombre}></HeaderTurno>

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
          contador={`${realHora}`}
          color="#FFFFFF"
        ></Plan>
        <Plan
          texto1="REAL"
          texto2="ACUMULADO"
          contador={`${realHora}`}
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
