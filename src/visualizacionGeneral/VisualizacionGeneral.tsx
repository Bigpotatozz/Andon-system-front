import React, { useEffect, useState } from "react";
import { Plan } from "./components/Plan";
import PlanSquare from "./components/PlanSquare";
import { HeaderTurno } from "@/components/myComponents/HeaderTurno";

const VisualizacionGeneral = () => {
  return (
    <div>
      <HeaderTurno turno="Primer turno"></HeaderTurno>

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
