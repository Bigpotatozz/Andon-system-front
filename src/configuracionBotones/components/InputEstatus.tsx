import { TextInput, FileInput, Label } from "flowbite-react";
import React from "react";
import type { Estatus } from "../../Models/Estatus";

//Props del componente
type InputEstatusProps = {
  estatus: Estatus;
  actualizarPeso: (value: number) => void;
  actualizarCancion: (value: string) => void;
  actualizarArchivo: (value: File) => void;
};

//Este componente lleva una serie de props que son setters para poder modificar datos del padre
export const InputEstatus = ({
  estatus,
  actualizarPeso,
  actualizarCancion,
  actualizarArchivo,
}: InputEstatusProps) => {
  //Funcion que actualiza el peso del estatus padre
  const cambiarPeso = (e: React.ChangeEvent<HTMLInputElement>) => {
    actualizarPeso(Number(e.target.value));
  };

  //Funcion que actualiza el file de musica del estatus - padre
  const cambiarMusica = (e: React.ChangeEvent<HTMLInputElement>) => {
    actualizarCancion(e.target.files ? e.target.files[0].name : "No file");
    actualizarArchivo(e.target.files ? e.target.files[0] : null);
  };

  return (
    <>
      <div className="container mt-6 mb-5 flex items-center gap-2">
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
              //Inovacion de funcion que actualiza el peso del estatus - padre
              cambiarPeso(e);
            }}
          />
        </div>
        <div className="cancion flex items-center">
          <FileInput
            id="file-upload"
            onChange={(e) => {
              //Invocacion de funcion que actualiza el archivo de musica del estatus - padre
              cambiarMusica(e);
            }}
          />
        </div>
      </div>
    </>
  );
};
