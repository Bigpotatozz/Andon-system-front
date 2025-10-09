import axios from "axios";
import { Button, ButtonGroup } from "flowbite-react";
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { InputEstatus } from "./components/InputEstatus";
import { Estatus } from "../Models/Estatus";

export const ConfiguracionBotones = () => {
  let lineasIds = localStorage.getItem("idsLineas");
  lineasIds = JSON.parse(lineasIds);

  const [estatus, setEstatus] = useState<Estatus[]>([
    new Estatus("#49FF00", 0, ""),
    new Estatus("#FBFF00", 0, ""),
    new Estatus("#FF9300", 0, ""),
    new Estatus("#FF0000", 0, ""),
    new Estatus("#0046FF", 0, ""),
    new Estatus("#7B542F", 0, ""),
    new Estatus("#3338A0", 0, ""),
    new Estatus("#2DCDDF", 0, ""),
    new Estatus("#B6EB7A", 0, ""),
    new Estatus("#F6ACC8", 0, ""),
  ]);

  const actualizarPeso = (indice: number, peso: number) => {
    setEstatus((prev) => {
      const nuevoArray = [...prev];
      nuevoArray[indice] = { ...nuevoArray[indice], peso: peso };
      return nuevoArray;
    });
  };

  const actualizarCancion = (indice: number, cancion: string) => {
    setEstatus((prev) => {
      const nuevoArregloMusica = [...prev];
      nuevoArregloMusica[indice] = {
        ...nuevoArregloMusica[indice],
        cancion: cancion,
      };
      return nuevoArregloMusica;
    });
  };

  const postEstados = async (lineasids: number[], colores: Estatus[]) => {
    const response = await axios.post(
      "http://localhost:3000/api/estatus/crearColor",
      {
        colores: estatus,
        lineas: lineasIds,
      },
    );

    console.log(response);
  };

  return (
    <>
      <div className="h-full text-center">
        <h1 className="pt-5 text-center text-lg font-bold text-white">
          Registra tus lineas de produccion:
        </h1>
        <div className="flex flex-col p-10">
          {estatus.map((objeto, index) => (
            <InputEstatus
              key={index}
              estatus={objeto}
              actualizarPeso={(nuevoPeso) => {
                actualizarPeso(index, nuevoPeso);
              }}
              actualizarMusica={(nuevaCancion) => {
                actualizarCancion(index, nuevaCancion);
              }}
            />
          ))}

          <Button color="green" onClick={() => postEstados(lineasIds, estatus)}>
            Confirmar
          </Button>
        </div>
      </div>
    </>
  );
};
