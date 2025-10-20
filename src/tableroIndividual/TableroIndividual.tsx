import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LineaProduccion } from "../Models/LineaProduccion";

export const TableroIndividual = () => {
  const navegacion = useNavigate();
  const [linea, setLinea] = useState<LineaProduccion>(
    new LineaProduccion("NE", "NE", 0, 0, 0, 0, 0, "NE", "NE"),
  );
  const { idLinea } = useParams();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [reproducirAudio, setReproducirAudio] = useState(false);

  const obtenerEstatusLinea = async (idLinea: string | undefined) => {
    const response = await axios.get(
      `http://localhost:3000/api/estatus/obtenerEstatusEspecifico/${idLinea}`,
    );
    setLinea(response.data.response[0]);
    console.log(response.data);
  };

  useEffect(() => {
    if (!reproducirAudio) return;

    obtenerEstatusLinea(idLinea);

    const loop = setInterval(() => {
      obtenerEstatusLinea(idLinea);
      console.log("Loop iniciado");
    }, 10000);

    return () => clearInterval(loop);
  }, [reproducirAudio, idLinea]);

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
      <div className="generalContainer border-black text-center">
        <h1 className="p-3">
          <strong className="text-white">
            Estado de la linea de produccion
          </strong>
        </h1>

        <div className="container1">
          <div className="flex">
            <div className="infoLinea m-5 w-xl rounded-md border-black bg-gray-700 text-start">
              <div className="rounded-md bg-lime-400 p-3 text-center">
                <h2 className="text-2xl">
                  <strong>Linea</strong>
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

            <div className="infoLinea m-5 w-xl rounded-md border-black bg-gray-700 text-start">
              <div className="rounded-md bg-yellow-300 p-3 text-center">
                <h2 className="text-2xl">
                  <strong>Produccion en porcentaje</strong>
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
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Estatus
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tiempo
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {linea.idLineaProduccion}
                  </th>

                  <td className="px-6 py-4">$2999</td>
                </tr>
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
