import axios from "axios";
import { Button } from "flowbite-react";
import { useState } from "react";
import { InputEstatus } from "./components/InputEstatus";
import { Estatus } from "../Models/Estatus";
import { useNavigate } from "react-router";
import { LineaCard } from "../tableroGeneral/components/LineaCard";

export const ConfiguracionBotones = () => {
  let lineasIds = localStorage.getItem("idsLineas");
  lineasIds = JSON.parse(lineasIds);
  const navegacion = useNavigate();

  const [canciones, setCanciones] = useState<File[]>([]);

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

  const actualizarCancion = (indice: number, cancion: File) => {
    setEstatus((prev) => {
      const nuevoArregloMusica = [...prev];
      nuevoArregloMusica[indice] = {
        ...nuevoArregloMusica[indice],
        cancion: cancion,
      };
      return nuevoArregloMusica;
    });
  };

  const actualizarFileCanciones = (indice, cancion: File) => {
    setCanciones((prev) => {
      const nuevasCanciones = [...prev];
      nuevasCanciones[indice] = cancion;
      return nuevasCanciones;
    });
  };

  const postEstados = async (
    lineasids: number[],
    colores: Estatus[],
    canciones: File[],
  ) => {
    const reqBody = {
      colores: colores,
      idsLineasProduccion: lineasIds,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(reqBody));

    canciones.forEach((cancion, index) => {
      formData.append(`cancion${index}`, cancion);
    });

    const response = await axios.post(
      "http://localhost:3000/api/estatus/crearColor",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    console.log(response);
  };

  return (
    <>
      <div className="h-full text-center">
        <h1 className="pt-5 text-center text-lg font-bold text-white">
          Configura tus estatus:
        </h1>
        <div className="flex flex-col p-10">
          <div className="mb-6 flex justify-center gap-10">
            <div>
              {estatus.map((objeto, index) => (
                <InputEstatus
                  key={index}
                  estatus={objeto}
                  actualizarPeso={(nuevoPeso) => {
                    actualizarPeso(index, nuevoPeso);
                  }}
                  actualizarCancion={(cancion) => {
                    actualizarCancion(index, cancion);
                  }}
                  actualizarArchivo={(cancion) => {
                    actualizarFileCanciones(index, cancion);
                  }}
                />
              ))}
            </div>

            <div className="flex max-w-2xl flex-wrap">
              {estatus.slice(1).map((e, index) => {
                return (
                  <LineaCard
                    color={e.color}
                    estatus={10}
                    tiempo="00:10:01"
                    nombre={`P${index}`}
                  ></LineaCard>
                );
              })}
            </div>
          </div>

          <Button
            color="green"
            onClick={() => {
              postEstados(lineasIds, estatus, canciones);
              navegacion("/tableroGeneral");
            }}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </>
  );
};
