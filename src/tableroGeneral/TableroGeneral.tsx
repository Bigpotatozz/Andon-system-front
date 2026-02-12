import { LineaCard } from "./components/LineaCard";
import { useEffect, useRef, useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";
import { socket } from "@/sockets/socket";
import axios from "axios";

type TableroGeneralProps = {
  lineaProduccion: number;
};

export const TableroGeneral = ({ lineaProduccion }: TableroGeneralProps) => {
  const [estados, setEstados] = useState<any[]>([]);
  const [audioDevice, setAudioDevice] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const iniciarPLC = async () => {
    try {
      await axios.get("http://localhost:3000/api/linea/iniciarPLC");
    } catch (error) {
      console.error("Error al iniciar PLC:", error);
    }
  };

  // Función para solicitar permiso y elegir dispositivo (Requiere clic del usuario)
  const configurarSalidaAudio = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.selectAudioOutput) {
        const device = await navigator.mediaDevices.selectAudioOutput();
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

  // Efecto para cambiar la salida de audio cuando se selecciona un dispositivo
  useEffect(() => {
    if (
      audioRef.current &&
      audioDevice &&
      "setSinkId" in HTMLMediaElement.prototype
    ) {
      (audioRef.current as any)
        .setSinkId(audioDevice)
        .then(() => console.log("Salida de audio configurada en:", audioDevice))
        .catch((e: any) =>
          console.error("Error al asignar salida de audio:", e),
        );
    }
  }, [audioDevice]);

  // Inicialización del PLC
  useEffect(() => {
    iniciarPLC();
  }, []);

  const obtenerEstatus = () => {
    // Limpiamos el evento previo para no duplicar sonidos
    socket.off("obtenerEstatus");

    socket.on("obtenerEstatus", (data) => {
      let dataFiltrada = data;

      if (lineaProduccion > 0) {
        dataFiltrada = data.filter(
          (estacion: any) => estacion.idLineaProduccion === lineaProduccion,
        );
      }

      setEstados(dataFiltrada);

      // Lógica de prioridad de audio
      let audioNuevo = "";
      let maxPrioridad = -1;

      dataFiltrada.forEach((estado: any) => {
        if (estado.prioridad > maxPrioridad) {
          maxPrioridad = estado.prioridad;
          audioNuevo = estado.cancion;
        }
      });

      if (!audioRef.current) return;

      if (!audioNuevo) {
        audioRef.current.pause();
        audioRef.current.src = "";
        return;
      }

      const nuevaRuta = `http://localhost:3000/uploads/${audioNuevo}`;

      if (audioRef.current.src !== nuevaRuta) {
        audioRef.current.src = nuevaRuta;
        audioRef.current.loop = true;

        // Intentar reproducir (fallará si el usuario no ha hecho clic en la página aún)
        audioRef.current.play().catch((e) => {
          console.warn(
            "Reproducción bloqueada: El usuario debe interactuar con la interfaz primero.",
          );
        });
      }
    });

    socket.emit("obtenerEstatus");
  };

  useEffect(() => {
    obtenerEstatus();
    return () => {
      socket.off("obtenerEstatus");
    };
  }, [lineaProduccion, audioDevice]); // Se reinicia si cambia la línea o el dispositivo

  return (
    <>
      <audio ref={audioRef} hidden></audio>
      <div className="flex w-full flex-col items-center justify-center">
        {/* Botón necesario para activar la API de Audio y el permiso de reproducción */}
        {!audioDevice && (
          <Button
            color="warning"
            className="mb-5"
            onClick={configurarSalidaAudio}
          >
            Activar Sonidos de Alerta
          </Button>
        )}

        <div className="flex flex-wrap justify-center">
          {estados?.map((estado) => (
            <LineaCard
              key={estado.idEstacion}
              nombre={estado.nombreEstacion}
              estatus={estado.estatusActual ?? 0}
              tiempo={estado.total}
              color={estado.color}
            />
          ))}
        </div>

        <Link to={"/"}>
          <Button className="mt-10 bg-purple-700 text-white hover:bg-purple-800">
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </>
  );
};
