import axios from "axios";
import { Button } from "flowbite-react";
import { useState } from "react";
import { InputEstatus } from "./components/InputEstatus";
import { Estatus } from "../Models/Estatus";
import { useNavigate } from "react-router";
import { LineaCard } from "../tableroGeneral/components/LineaCard";

export const ConfiguracionBotones = () => {
  //Accede al arreglo de ids previamente guardados en el localStorage
  let lineasIds = localStorage.getItem("idsLineas");
  //Las parsea para poder usarlas
  lineasIds = JSON.parse(lineasIds);
  //Estado de navegacion
  const navegacion = useNavigate();
  //Declara un arreglo Files que es donde iran las canciones (hook)
  const [canciones, setCanciones] = useState<File[]>([]);
  //Declara un arreglo de estatus y los inicializa (hook)
  const [estatus, setEstatus] = useState<Estatus[]>([
    new Estatus("#49FF00", 1000, 0, ""),
    new Estatus("#FBFF00", 1001, 0, ""),
    new Estatus("#FF9300", 1002, 0, ""),
    new Estatus("#FF0000", 1003, 0, ""),
    new Estatus("#0046FF", 1004, 0, ""),
    new Estatus("#7B542F", 1005, 0, ""),
    new Estatus("#3338A0", 1006, 0, ""),
    new Estatus("#2DCDDF", 1007, 0, ""),
    new Estatus("#B6EB7A", 1008, 0, ""),
    new Estatus("#F6ACC8", 1009, 0, ""),
  ]);
  //Declara un arreglo de estatus donde se guardaran los que se van a enviar a la api
  let estatusLimpios: Estatus[] = [];

  //Funcion que limpia el arreglo estatus para pasarlo a estatusLimpios
  const limpiarEstatus = () => {
    estatusLimpios = estatus.filter((estatus) => estatus.peso != 0);
  };

  //Funcion que se encarga de actualizar el peso de cada uno de los estatus
  const actualizarPeso = (indice: number, peso: number) => {
    setEstatus((prev) => {
      const nuevoArray = [...prev];
      nuevoArray[indice] = { ...nuevoArray[indice], peso: peso };
      return nuevoArray;
    });
  };

  //Funcion que actualiza la cancion del estatus
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

  //Funcion que actualiza los archivos de las canciones del estatus
  const actualizarFileCanciones = (indice, cancion: File) => {
    setCanciones((prev) => {
      const nuevasCanciones = [...prev];
      nuevasCanciones[indice] = cancion;
      return nuevasCanciones;
    });
  };

  //Funcion para mandar los estatus a la api
  const postEstados = async (
    lineasids: number[],
    colores: Estatus[],
    canciones: File[],
  ) => {
    //Define el cuerpo de la peticion
    const reqBody = {
      colores: colores,
      idsLineasProduccion: lineasIds,
    };

    //Crea un nuevo formData para meter los datos a registrar
    const formData = new FormData();

    //Le agrega el body al formData
    formData.append("data", JSON.stringify(reqBody));

    //Recorre cada parte del arreglo de canciones y lo va a gregando al formData
    canciones.forEach((cancion, index) => {
      formData.append(`cancion${index}`, cancion);
    });

    //Realiza la peticion HTTP
    const response = await axios
      .post("http://localhost:3000/api/estatus/crearColor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.log(error);
      });

    if (response) {
      navegacion("/tableroGeneral");
    } else {
      alert("Error al registrar estatus");
    }
  };

  //Frontend

  //En el html se instancia otro componente donde se le pasa como prop la funcion de actualizacion
  //esto para que al hijo pueda modificar datos del padre
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
              limpiarEstatus();

              postEstados(lineasIds, estatusLimpios, canciones);
            }}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </>
  );
};
