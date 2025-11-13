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
    console.log("adadawd");

    setReproducirAudio(false);

    console.log(response.data.response[0]);
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
    if (!reproducirAudio || !linea?.cancion) {
      audioRef.current?.pause();
      return;
    }

    console.log(audioRef);
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
      <div className="flex min-h-screen flex-col">
        <div className="p-4">
          <h1 className="text-center">
            <strong className="text-2xl text-white md:text-3xl">
              Estado de la línea de producción
            </strong>
          </h1>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col p-4">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-gray-700 shadow-lg">
              <div
                className="p-4 text-center"
                style={{ background: `${linea.color}` }}
              >
                <h2 className="text-xl font-bold text-white">Estatus actual</h2>
              </div>
              <div className="p-6 text-white">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-300">Estatus</p>
                  <p className="text-2xl font-bold">{linea.estatusActual}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-300">
                    Prioridad
                  </p>
                  <p className="text-2xl font-bold">{linea.prioridad}</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-gray-700 shadow-lg">
              <div className="bg-yellow-400 p-4 text-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Producción en porcentaje
                </h2>
              </div>
              <div className="p-6 text-white">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-300">Meta</p>
                  <p className="text-2xl font-bold">100%</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-300">Real</p>
                  <p className="text-2xl font-bold">80%</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-gray-700 shadow-lg">
              <div className="bg-cyan-400 p-4 text-center">
                <h2 className="text-xl font-bold text-gray-900">Producción</h2>
              </div>
              <div className="p-6 text-white">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-300">Meta</p>
                  <p className="text-2xl font-bold">3000</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-300">Real</p>
                  <p className="text-2xl font-bold">2500</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex-1 overflow-y-auto rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-400">
                <thead className="sticky top-0 bg-gray-800 text-gray-200 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left">
                      Estatus
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      Fecha de inicio
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      Fecha final
                    </th>
                    <th scope="col" className="px-6 py-4 text-left">
                      Tiempo total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tiempos.map((tiempo, index) => (
                    <tr
                      key={index}
                      className="bg-gray-750 transition-colors hover:bg-gray-700"
                    >
                      <td className="px-6 py-4">
                        <div
                          style={{
                            width: "20px",
                            height: "12px",
                            background: `${tiempo.color}`,
                            borderRadius: "2px",
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {tiempo.inicio}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {tiempo.final}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {convertirSegundos(tiempo.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 pb-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setReproducirAudio(!reproducirAudio)}
              className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-green-700 hover:shadow-lg"
            >
              {reproducirAudio ? "Detener sonido" : "Reproducir sonido"}
            </button>
            <button
              type="button"
              onClick={() => {
                audioRef.current?.pause();
                navegacion("/");
              }}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg"
            >
              Volver al menú
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
