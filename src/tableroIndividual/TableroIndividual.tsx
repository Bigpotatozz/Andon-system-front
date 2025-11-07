import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LineaProduccion } from "../Models/LineaProduccion";
import { TiemposLineaProduccion } from "@/Models/TiemposLineaProduccion";
import { convertirSegundos } from "@/helpers/conversorSegundos";

//En este componente se puede ver el estado de la linea de produccion (individual)

export const TableroIndividual = () => {
  //hook de navegacion
  const navegacion = useNavigate();
  //Inicializacion de los datos que es obtendran de la api
  const [linea, setLinea] = useState<LineaProduccion>(
    new LineaProduccion("NE", "NE", 0, 0, 0, 0, 0, "NE", "NE"),
  );

  //Inicializacion de los tiempos que se obtendran de la api
  const [tiempos, setTiempos] = useState<TiemposLineaProduccion[]>([
    new TiemposLineaProduccion(
      "NE",
      "NE",
      0,
      0,
      0,
      0,
      0,
      "NE",
      "NE",
      "NE",
      "NE",
      "NE",
      0,
    ),
  ]);
  //Accede al id indicado por la URL
  const { idLinea } = useParams();

  //Inicializacion de elemento de audio
  const audioRef = useRef<HTMLAudioElement>(null);
  //Inicializacion de estado de audio
  const [reproducirAudio, setReproducirAudio] = useState(false);

  //Funcion que hace la peticion http para obtener la informacion de la linea de produccion
  const obtenerEstatusLinea = async (idLinea: string | undefined) => {
    const response = await axios.get(
      `http://localhost:3000/api/estatus/obtenerEstatusEspecifico/${idLinea}`,
    );
    setLinea(response.data.response[0]);
    setTiempos(response.data.response2);
    console.log(response.data);
  };

  //Hook que al iniciar la pantalla obtiene automaticamente la informacion de la linea
  //Hace la peticion
  useEffect(() => {
    if (!reproducirAudio) return;

    obtenerEstatusLinea(idLinea);

    const loop = setInterval(() => {
      obtenerEstatusLinea(idLinea);
      console.log("Loop iniciado");
    }, 10000);

    return () => clearInterval(loop);
  }, [reproducirAudio, idLinea]);

  //Hook que controla la reproduccion de audio
  useEffect(() => {
    if (!reproducirAudio || !linea?.cancion) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(
      `http://localhost:3000/uploads/${linea.cancion}`,
    );
    audioRef.current.play().catch((e) => {
      console.log(e);
    });

    console.log(linea);
  });

  return (
    <>
      <div className="generalContainer items-center border-black text-center">
        <h1 className="p-3">
          <strong className="text-white">
            Estado de la linea de produccion
          </strong>
        </h1>

        <div className="container1">
          <div className="flex">
            <div className="infoLinea m-5 w-xl rounded-md border-black bg-gray-700 text-start">
              <div
                className="rounded-md p-3 text-center"
                style={{ background: `${linea.color}` }}
              >
                <h2 className="text-2xl">
                  <strong>Estatus actual</strong>
                </h2>
              </div>
              <div className="flex justify-center gap-30 p-10 text-white">
                <p className="text-center text-2xl">
                  <strong> Estatus: </strong>
                  <br></br> {linea.estatusActual}
                </p>
                <p className="text-center text-2xl">
                  <strong>Prioridad:</strong>
                  <br></br> {linea.prioridad}
                </p>
              </div>
            </div>

            <div className="infoLinea m-5 w-xl rounded-md border-black bg-gray-700 text-start">
              <div className="rounded-md bg-yellow-300 p-3 text-center">
                <h2 className="text-2xl">
                  <strong>Produccion en porcentaje</strong>
                </h2>
              </div>
              <div className="flex justify-center gap-30 p-10 text-white">
                <p className="text-center text-2xl">
                  <strong>Meta:</strong>
                  <br></br> 100%
                </p>
                <p className="text-center text-2xl">
                  <strong>Real:</strong>
                  <br></br> 80%
                </p>
              </div>
            </div>

            <div className="infoLinea m-5 w-xl rounded-md border-black bg-gray-700 text-start">
              <div className="rounded-md bg-cyan-400 p-3 text-center">
                <h2 className="text-2xl">
                  <strong>Produccion</strong>
                </h2>
              </div>
              <div className="flex justify-center gap-30 p-10 text-white">
                <p className="text-2xl">
                  <strong>Meta:</strong>
                  <br></br> 3000
                </p>
                <p className="text-2xl">
                  <strong>Real:</strong>
                  <br></br> 2500
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <table className="w-full text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Estatus
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha de inicio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha final
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tiempo total (segundos)
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiempos.map((linea) => {
                  return (
                    <>
                      <tr className="border-b border-gray-200 bg-white text-center hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                        >
                          <div
                            style={{
                              width: "25px",
                              height: "15px",
                              background: `${linea.color}`,
                              borderRadius: "2px",
                            }}
                          ></div>
                        </td>
                        <td className="px-6 py-4">{linea.inicio}</td>
                        <td className="px-6 py-4">{linea.final}</td>
                        <td className="px-6 py-4">
                          {convertirSegundos(linea.total)}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setReproducirAudio(!reproducirAudio);
          }}
          className="me-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Reproducir sonido
        </button>
        <button
          type="button"
          onClick={() => {
            audioRef.current?.pause();
            navegacion("/");
          }}
          className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Volver al menu
        </button>
      </div>
    </>
  );
};
