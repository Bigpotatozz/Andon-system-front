import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";

export const ProductionRatio = () => {
  const [tiempoLunch, setTiempoLunch] = useState(0);
  const [tiempoBreak, setTiempoBreak] = useState(0);
  const [tiempoParo, setTiempoParo] = useState(0);
  const [tiempoPQ, setTiempoPQ] = useState(0);
  const [cicleTime, setCicleTime] = useState(0);

  return (
    <>
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
