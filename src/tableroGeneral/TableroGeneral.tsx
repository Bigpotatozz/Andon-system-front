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
            console.warn("Reproducción bloqueada por el navegador.");
          });
        }
      }
    };

    // Se conecta al socket
    socket.on("obtenerEstatus", manejarEstatus);
    // Pide los datos del socket
    socket.emit("obtenerEstatus");
    //Cada que se ejecuta el useEffect se desconecta del socket y lo limpia
    return () => {
      socket.off("obtenerEstatus", manejarEstatus);
    };
  }, [lineaProduccion]); // Se reinicia si cambia la línea

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <audio ref={audioRef} hidden />

      {!audioDevice && (
        <Button
          color="warning"
          className="mb-5 animate-pulse"
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

      <Link to={"/"} className="mt-10">
        <Button className="bg-purple-700 text-white hover:bg-purple-800">
          Regresar al inicio
        </Button>
      </Link>
    </div>
  );
};

export default TableroGeneral;
