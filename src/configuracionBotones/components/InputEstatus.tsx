import { TextInput, FileInput, Label } from "flowbite-react";
import React from "react";
import type { Estatus } from "../../Models/Estatus";

type InputEstatusProps = {
  estatus: Estatus;
  actualizarPeso: (value: number) => void;
  actualizarCancion: (value: string) => void;
  actualizarArchivo: (value: File) => void;
};

export const InputEstatus = ({
  estatus,
  actualizarPeso,
  actualizarCancion,
  actualizarArchivo,
}: InputEstatusProps) => {
  const cambiarPeso = (e: React.ChangeEvent<HTMLInputElement>) => {
    actualizarPeso(Number(e.target.value));
  };

  const cambiarMusica = (e: React.ChangeEvent<HTMLInputElement>) => {
    actualizarCancion(e.target.files ? e.target.files[0].name : "No file");
    actualizarArchivo(e.target.files ? e.target.files[0] : null);
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
          <FileInput
            id="file-upload"
            onChange={(e) => {
              cambiarMusica(e);
            }}
          />
        </div>
      </div>
    </>
  );
};
