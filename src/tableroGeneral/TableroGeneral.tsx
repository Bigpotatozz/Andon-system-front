import { LineaCard } from "./components/LineaCard";
import { useEffect, useRef, useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";
import { convertirSegundos } from "@/helpers/conversorSegundos";
import { socket } from "@/sockets/socket";
import axios from "axios";

type TableroGeneralProps = {
  lineaProduccion: number;
};

//En el tablero general puedes ver la informacion general de todas las lineas de produccion
export const TableroGeneral = ({ lineaProduccion }: TableroGeneralProps) => {
  //Inicializacion de los estados que se recibiran de la API
  const [estados, setEstados] = useState<any[]>([]);
  const [dispositivosAudio, setDispositivosAudio] = useState<MediaDeviceInfo>(
    [],
  );

  const [audioDevice, setAudioDevice] = useState("");
  //Se declara un estado de tipo useRef
  const audioRef = useRef<HTMLAudioElement>(null);

  const iniciarPLC = async () => {
    await axios.get("http://localhost:3000/api/linea/iniciarPLC");
  };

  useEffect(() => {
    const elegirAudioDevice = async () => {
      try {
        const device = await navigator.mediaDevices.selectAudioOutput();
        console.log(device);
        setAudioDevice(device.deviceId);
      } catch (e) {
        console.log(e);
      }
    };

    elegirAudioDevice();
  }, []);

  useEffect(() => {
    if (audioRef.current && audioDevice) {
      audioRef.current
        .setSinkId(audioDevice)
        .then(() => {
          console.log("Dispositivo de salida:", audioDevice);
        })
        .catch((e) => {
          console.error("Error al configurar dispositivo de salida", e);
        });
    }
  }, [audioDevice]);
  useEffect(() => {
    iniciarPLC();
    return () => {
      socket.off("obtenerEstatus");
    };
  }, []);

  //Funcion que accede al socket para obtener los estatus
  const obtenerEstatus = async () => {
    socket.on("obtenerEstatus", (data) => {
      console.log(data);

      if (lineaProduccion > 0) {
        data = data.filter(
          (estacion: any) => estacion.idLineaProduccion === lineaProduccion,
        );

        setEstados(data);
      } else {
        setEstados(data);
      }

      let audioNuevo = "";
      let max = 0;

      data.forEach((estado: any) => {
        //Verifica si es mayor
        if (estado.prioridad > max) {
          //Si es mayor lo asigna a max y le da ese valor a la variable que contendra la cancion
          max = estado.prioridad;
          audioNuevo = estado.cancion;
        }
      });

      if (!audioRef.current) {
        return;
      }

      console.log(audioNuevo);

      if (!audioNuevo) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
        return;
      }

      //Si existe un audio en audioRef y si audioNuevo tiene algo
      if (audioRef.current && audioNuevo) {
        //Reconstruye una nueva ruta
        const nuevaRuta = `http://localhost:3000/uploads/${audioNuevo}`;

        //Si la ruta del audio actual es diferente a la ruta nueva
        if (audioRef.current.src !== nuevaRuta) {
          //Le asigna la ruta nueva
          audioRef.current.src = nuevaRuta;
          //Indica que se ejecute hasta que llegue un nuevo audio
          audioRef.current.loop = true;

          //Reproduce el sonido
          audioRef.current.play().catch((e) => {
            console.log(e);
          });
        } else {
          //En caso de que sea igual simplemente imprime "Mismo audio"
          console.log("Mismo audio");
        }
      }
    });

    socket.emit("obtenerEstatus");
  };
  //Hook que al cargar la pagina hace automaticamente la peticion a la api con la funcion obtenerEstatus

  //Hook general
  useEffect(() => {
    obtenerEstatus();
  }, [lineaProduccion]);

  return (
    <>
      <audio ref={audioRef} hidden></audio>
      <div className="align-center flex w-full flex-col items-center justify-center pt-5">
        <div className="flex flex-wrap justify-center">
          {estados?.map((estado) => {
            return (
              <LineaCard
                key={estado.idEstacion}
                nombre={estado.nombreEstacion}
                estatus={estado.estatusActual ?? 0}
                tiempo={estado.total}
                color={estado.color}
              />
            );
          })}
        </div>
        <Link to={"/"}>
          <Button className="me-2 mt-10 rounded-lg bg-purple-700 p-10 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-400 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </>
  );
};
