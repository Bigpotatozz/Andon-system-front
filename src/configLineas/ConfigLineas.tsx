import axios from "axios";
import { TextInput, Button, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const ConfigLineas = () => {
  const navegacion = useNavigate();
  //Se declaran los arreglos de las 3 columnas
  const [lineas, setLineas] = useState(new Array(10).fill(0));
  const [lineas2, setLineas2] = useState(new Array(10).fill(0));
  const [lineas3, setLineas3] = useState(new Array(10).fill(0));
  const [lineasRegistradas, setLineasRegistradas] = useState<any[]>([]);

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

  const obtenerLineasRegistradas = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/linea/obtenerLineasRegistradas",
    );
    setLineasRegistradas(response.data.lineas);
  };

  useEffect(() => {
    obtenerLineasRegistradas();
  }, []);

  useEffect(() => {
    console.log(lineasRegistradas);
  }, []);

  //Funcion que envia la peticion HTTP al servidor
  //Recibe como parametro el arreglo
  async function postLineas(lineasTotales: number[]) {
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
      navegacion("/configuracionBotones");
    } else {
      alert("Error al registrar las lineas");
    }
  }

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
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center font-bold text-white">
          Registra tus líneas de producción
        </h1>

        <div className="mb-10 rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">
            Líneas de producción registradas
          </h2>

          {lineasRegistradas && lineasRegistradas.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-sm text-gray-300">
                <thead className="bg-gray-700 text-white uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Identificador
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Nombre
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {lineasRegistradas.map((linea, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-750 bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">
                        {linea.idLineaProduccion}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {`Linea: ${linea.idLineaProduccion}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-400">
                No hay líneas de producción registradas aún
              </p>
            </div>
          )}
        </div>

        <div className="mb-8 rounded-lg bg-gray-800 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              {lineas.map((_, idx) => (
                <div key={idx}>
                  <Label htmlFor={`linea1-${idx}`}>Línea {idx + 1}:</Label>
                  <TextInput
                    id={`linea1-${idx}`}
                    type="number"
                    onChange={(e) => agregarLinea(e, idx, setLineas, lineas)}
                  />
                </div>
              ))}
            </div>

            <div>
              {lineas2.map((_, idx) => (
                <div key={idx}>
                  <Label htmlFor={`linea2-${idx}`}>Línea {idx + 1}:</Label>
                  <TextInput
                    id={`linea2-${idx}`}
                    type="number"
                    onChange={(e) => agregarLinea(e, idx, setLineas2, lineas2)}
                  />
                </div>
              ))}
            </div>

            <div>
              {lineas3.map((_, idx) => (
                <div key={idx}>
                  <Label htmlFor={`linea3-${idx}`}>Línea {idx + 1}:</Label>
                  <TextInput
                    id={`linea3-${idx}`}
                    type="number"
                    onChange={(e) => agregarLinea(e, idx, setLineas3, lineas3)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            color="green"
            className="mt-6 w-full"
            onClick={() => {
              //Une el arreglo en uno nuevo
              unirArreglo(lineas, lineas2, lineas3);

              //Valida que el arreglo contenga al menos una linea
              if (lineasGeneral.length <= 0) {
                //Alerta en caso de que no
                alert("Registra al menos una línea");
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
            Registrar líneas
          </Button>
        </div>
      </div>
    </div>
  );
};
