import { useEffect, useRef, useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";
import { socket } from "@/sockets/socket";
import axios from "axios";
import { usePLCStore } from "@/store/plcStore";
import { LineaCard } from "./components/LineaCard";

type TableroGeneralProps = {
  lineaProduccion: number;
};

export const TableroGeneral = ({ lineaProduccion }: TableroGeneralProps) => {
  const [estados, setEstados] = useState<any[]>([]);
  const [audioDevice, setAudioDevice] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [oee, setOee] = useState<any[]>([]);

  const { ip, brand } = usePLCStore();

  // Logica para iniciar el PLC
  const iniciarPLC = async () => {
    try {
      if (!ip || !brand) return;
      await axios.post("http://localhost:3000/api/linea/iniciarPLC", {
        ip,
        marca: brand,
      });
    } catch (error) {
      console.error("Error al iniciar PLC:", error);
    }
  };

  useEffect(() => {
    iniciarPLC();
  }, []);

  // Configuración de salida de audio
  const configurarSalidaAudio = async () => {
    try {
      if (
        navigator.mediaDevices &&
        (navigator.mediaDevices as any).selectAudioOutput
      ) {
        const device = await (
          navigator.mediaDevices as any
        ).selectAudioOutput();
        setAudioDevice(device.deviceId);
      } else {
        alert(
          "Tu navegador no soporta la selección de salida de audio específica.",
        );
      }
    } catch (e) {
      console.error("Permiso denegado o error de hardware:", e);
    }
  };

  // Efecto para asignar el dispositivo de audio (SinkId)
  useEffect(() => {
    if (
      audioRef.current &&
      audioDevice &&
      "setSinkId" in HTMLMediaElement.prototype
    ) {
      (audioRef.current as any)
        .setSinkId(audioDevice)
        .catch((e: any) =>
          console.error("Error al asignar salida de audio:", e),
        );
    }
  }, [audioDevice]);

  // Lógica central de Sockets y Audio (Refactorizada para evitar fugas de rendimiento)
  useEffect(() => {
    //Funcion que recibe un dato
    const manejarEstatus = (data: any) => {
      //Crea una variable local para almacenar los datos
      let dataFiltrada = data;
      //Si la linea de produccion es mayor a 0
      if (lineaProduccion > 0) {
        //Empieza a filtrar por ID
        dataFiltrada = data.filter(
          (estacion: any) => estacion.idLineaProduccion === lineaProduccion,
        );
      }

      //Establece los datos filtrados
      setEstados(dataFiltrada);

      //Logica de audio
      let maxPrioridad = -1;
      let cancionSugerida = "";

      //Recorre las estaciones
      dataFiltrada.forEach((estado: any) => {
        //Si la prioridad actual es mayor a la anterior
        if (estado.prioridad > maxPrioridad) {
          //Establece nueva prioridad y nueva cancion
          maxPrioridad = estado.prioridad;
          cancionSugerida = estado.cancion;
        }
      });

      //Si el audio es el mismo retorna
      if (!audioRef.current) return;

      //Si no hay alguna cancion
      if (!cancionSugerida) {
        // Si no hay alertas, pausar y limpiar para liberar RAM
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          audioRef.current.src = "";
        }
      } else {
        //Establece la ruta de la cancion
        const nuevaRuta = `http://localhost:3000/uploads/${cancionSugerida}`;

        // Solo cambiar el src si la canción es diferente
        if (audioRef.current.src !== nuevaRuta) {
          //Establece la nueva cancion
          audioRef.current.src = nuevaRuta;
          audioRef.current.loop = true;
          audioRef.current.play().catch((e) => {
            // Error común si el navegador bloquea el autoplay
            console.log(e);
            console.warn("Reproducción bloqueada por el navegador.");
          });
        }
      }
    };

    // Handler para OEE via socket
    const manejarOEE = (data: any) => {
      console.log("OEE Socket:", data);
      setOee(data);
    };

    // Se conecta al socket
    socket.on("obtenerEstatus", manejarEstatus);
    socket.on("obtenerOEESocket", manejarOEE);
    // Pide los datos del socket
    socket.emit("obtenerEstatus");
    socket.emit("obtenerOEESocket");
    //Cada que se ejecuta el useEffect se desconecta del socket y lo limpia
    return () => {
      socket.off("obtenerEstatus", manejarEstatus);
      socket.off("obtenerOEESocket", manejarOEE);
    };
  }, [lineaProduccion]); // Se reinicia si cambia la línea

  // Helper para color del porcentaje OEE
  const getOEEColor = (porcentaje: number) => {
    if (porcentaje >= 85) return "#22c55e";
    if (porcentaje >= 60) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-2">
      <audio ref={audioRef} hidden />

      {!audioDevice && (
        <Button
          color="warning"
          className="mb-3 animate-pulse"
          onClick={configurarSalidaAudio}
        >
          Activar Sonidos de Alerta
        </Button>
      )}

      <div className="flex flex-wrap justify-center gap-1">
        {estados.length > 0 ? (
          estados.map((estado) => (
            <LineaCard
              key={estado.idEstacion}
              nombre={estado.nombreEstacion}
              estatus={estado.estatusActual ?? 0}
              tiempo={estado.total} // Se asume que es el tiempo total acumulado
              color={estado.color}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">Esperando datos de la línea...</p>
        )}
      </div>

      {/* Sección OEE acumulado */}
      {oee.length > 0 && (
        <div className="mt-3 w-full">
          <h3 className="mb-2 text-center text-lg font-bold text-white">
            OEE Acumulado del Mes
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {oee.map((item: any) => {
              const pct = parseFloat(item.OEE) || 0;
              return (
                <div
                  key={`${item.idLineaProduccion}-${item.idTurno}`}
                  className="max-w-[220px] min-w-[160px] flex-1 rounded-lg border border-gray-600 bg-gray-800 p-3"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="truncate text-sm font-bold text-white">
                      {item.nombre}
                    </span>
                    <span
                      className="text-lg font-black"
                      style={{ color: getOEEColor(pct) }}
                    >
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-[10px] tracking-wider text-gray-400 uppercase">
                    {item.nombreTurno}
                  </p>
                  <div className="mt-1.5 flex justify-between text-xs text-gray-300">
                    <span>
                      Obj:{" "}
                      <strong>
                        {Number(item.objetivoProduccion).toLocaleString()}
                      </strong>
                    </span>
                    <span>
                      Real:{" "}
                      <strong
                        style={{
                          color:
                            item.progresoProduccion >= item.objetivoProduccion
                              ? "#22c55e"
                              : "inherit",
                        }}
                      >
                        {Number(item.progresoProduccion).toLocaleString()}
                      </strong>
                    </span>
                  </div>

                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: getOEEColor(pct),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Link to={"/"} className="mt-4">
        <Button className="bg-purple-700 text-white hover:bg-purple-800">
          Regresar al inicio
        </Button>
      </Link>
    </div>
  );
};

export default TableroGeneral;
