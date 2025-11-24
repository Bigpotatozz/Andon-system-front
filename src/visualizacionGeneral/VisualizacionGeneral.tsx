import React from "react";
import { Plan } from "./components/Plan";
import PlanSquare from "./components/PlanSquare";

const VisualizacionGeneral = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <div className="turno">
          <h2>
            <strong className="text-3xl">Turno:</strong>
          </h2>
          <h2 className="text-2xl font-semibold text-amber-300">
            Primer turno
          </h2>
        </div>
        <div className="fecha">
          <h3 className="text-xl text-lime-400">21/11/25</h3>
          <h3 className="text-xl text-lime-400">09:28:11</h3>
        </div>
      </div>

      <div className="flex justify-center">
        <Plan
          texto1="PLAN"
          texto2="HORA"
          contador={`00029`}
          color="#FFFFFF"
        ></Plan>
        <Plan
          texto1="PLAN"
          texto2="ACUMULADO"
          contador={`00029`}
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
    </div>
  );
};

export default VisualizacionGeneral;
