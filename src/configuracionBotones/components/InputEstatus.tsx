import { TextInput, FileInput, Label } from "flowbite-react";
import React from "react";
import type { Estatus } from "../../Models/Estatus";

type InputEstatusProps = {
  estatus: Estatus;
  actualizarPeso: (value: number) => void;
  actualizarMusica: (value: string) => void;
};

export const InputEstatus = ({
  estatus,
  actualizarPeso,
  actualizarMusica,
}: InputEstatusProps) => {
  const cambiarPeso = (e: React.ChangeEvent<HTMLInputElement>) => {
    actualizarPeso(Number(e.target.value));
  };

  const cambiarMusica = (e: React.ChangeEvent<HTMLInputElement>) => {
    actualizarMusica(e.target.value);
  };

  return (
    <>
      <div className="container m-3.5 flex items-center gap-2">
        <div className="color">
          <div
            className="h-7 w-10 rounded-lg"
            style={{ backgroundColor: estatus.color }}
          ></div>
        </div>
        <div className="peso flex items-center">
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            placeholder="Importancia"
            className="h-full"
            onChange={(e) => {
              cambiarPeso(e);
            }}
          />
        </div>
        <div className="cancion flex items-center">
          <FileInput id="file-upload" />
        </div>
      </div>
    </>
  );
};
