import axios from "axios";
import { TextInput, Button, Label } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const ConfigLineas = () => {
  const navegacion = useNavigate();
  //Se declaran los arreglos de las 3 columnas
  const [lineas, setLineas] = useState(new Array(10).fill(0));
  const [lineas2, setLineas2] = useState(new Array(10).fill(0));
  const [lineas3, setLineas3] = useState(new Array(10).fill(0));

  //Se declara un arreglo que agrupa las 3 columnas
  let lineasGeneral: number[] = [];

  //Se declara un arreglo que guarda los ids de las lineas previamente insertadas
  let idsLineas: number[] = [];

  //Funcion que une todos los arreglos en el lineasGeneral y limpia los que esten vacios
  const unirArreglo = (
    lineas1: number[],
    lineas2: number[],
    lineas3: number[],
  ) => {
    const lineasLimpias1 = lineas1.filter((e) => e != 0);
    const lineasLimpias2 = lineas2.filter((e) => e != 0);
    const lineasLimpias3 = lineas3.filter((e) => e != 0);

    const arregloUnido = [
      ...lineasLimpias1,
      ...lineasLimpias2,
      ...lineasLimpias3,
    ];

    lineasGeneral = arregloUnido;
  };

  //Funcion que envia la peticion HTTP al servidor
  //Recibe como parametro el arreglo
  const postLineas = async (lineasTotales: number[]) => {
    //Realiza la peticion HTTP
    const response = await axios
      .post("http://localhost:3000/api/linea/crearLinea", {
        idsLineasProduccion: lineasTotales,
      })
      .catch((error) => {
        console.log(error);

        return;
      });

    if (response) {
      //La respuesta ([1,2,4,5,6]) que son los ids de las lineas
      //recien insertadas la guarda en el arreglo previamente realizado
      idsLineas = response.data.idsLineas;

      //Guarda el arreglo en el localStorage para poder ser usado despues
      localStorage.setItem("idsLineas", JSON.stringify(idsLineas));
      console.log(response);
      navegacion("/configuracionBotones");
    } else {
      alert("Error al registrar las lineas");
    }
  };

  //Funcion que agrega todas las lineas a un solo arreglo
  const agregarLinea = (
    e: React.ChangeEvent<HTMLInputElement>, //Elemento HTML con el id de la linea nueva
    indice: number, //Indice de la linea
    setLineaParametro: React.Dispatch<React.SetStateAction<number[]>>, //Setter del estado de las lineas generales
    linea: number[], //Arreglo de lineas general
  ) => {
    const lineasModificadas = [...linea]; //Declara un nuevo arreglo y le hace una copia
    lineasModificadas[indice] = parseInt(e.target.value); //Parsea el elemento a un entero
    setLineaParametro(lineasModificadas); //Setea el nuevo arreglo
  };

  return (
    <>
      <div className="align-center flex flex-col items-center justify-center">
        <h1 className="mt-5 text-center text-lg font-bold text-white">
          Registra tus lineas de produccion:
        </h1>
        <div className="flex w-full">
          <div className="g-10 w-full p-10">
            {lineas.map((e, index) => {
              return (
                <>
                  <div className="mb-2 block" key={index}>
                    <Label htmlFor="small">Nombre de linea {index + 1}:</Label>
                  </div>
                  <TextInput
                    id="small"
                    type="number"
                    sizing="sm"
                    className="w-full"
                    onChange={(e) => {
                      agregarLinea(e, index, setLineas, lineas);
                    }}
                  />
                </>
              );
            })}
          </div>
          <div className="g-10 w-full p-10">
            {lineas2.map((e, index) => {
              return (
                <>
                  <div className="mb-2 block" key={index}>
                    <Label htmlFor="small">Nombre de linea {index + 1}:</Label>
                  </div>
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    className="w-full"
                    onChange={(e) => {
                      agregarLinea(e, index, setLineas2, lineas2);
                    }}
                  />
                </>
              );
            })}
          </div>
          <div className="g-10 w-full p-10">
            {lineas3.map((e, index) => {
              return (
                <>
                  <div className="mb-2 block" key={index}>
                    <Label htmlFor="small">Nombre de linea {index + 1}:</Label>
                  </div>
                  <TextInput
                    id="small"
                    type="number"
                    sizing="sm"
                    className="w-full"
                    onChange={(e) => {
                      agregarLinea(e, index, setLineas3, lineas3);
                    }}
                  />
                </>
              );
            })}
          </div>
        </div>

        <Button
          color="green"
          className="m-5"
          onClick={() => {
            //Une el arreglo en uno nuevo
            unirArreglo(lineas, lineas2, lineas3);

            //Valida que el arreglo contenga al menos una linea
            if (lineasGeneral.length <= 0) {
              //Alerta en caso de que no
              alert("Registra al menos una linea");
              return;
            }

            //Agrega un timeOut para esperar a que las lineas se recompongan
            //Esto evita que las lineas las de en nullas debido al flujo en el que trabaja js
            setTimeout(() => {
              //Manda la peticion
              postLineas(lineasGeneral);
            }, 2000);
          }}
        >
          Registrar lineas
        </Button>
      </div>
    </>
  );
};
