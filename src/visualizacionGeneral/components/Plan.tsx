import React from "react";

type PlanProps = {
  texto1: string;
  texto2: string;
  contador: string;
  color: string;
};

export const Plan = ({ texto1, texto2, contador, color }: PlanProps) => {
  return (
    <>
      <div
        className="m-2 flex items-center justify-between rounded-2xl border border-white p-5"
        style={{ width: "50%" }}
      >
        <div>
          <h2 className="text-4xl font-bold text-cyan-400">{texto1}</h2>
          <h2 className="text-4xl font-bold text-cyan-400">{texto2}</h2>
        </div>

        <div>
          <h1 className="text-5xl font-bold" style={{ color: color }}>
            {contador}
          </h1>
        </div>
      </div>
    </>
  );
};
