import axios from "axios";
import { use, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { LineaProduccion } from "../Models/LineaProduccion";

export const TableroIndividual = () => {
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
      <h1>Contenido de tablero de linea: {idLinea}</h1>
      <p>{linea.idLineaProduccion}</p>

      <button
        type="button"
        onClick={() => {
          setReproducirAudio(!reproducirAudio);
        }}
      >
        Reproducir sonido
      </button>
    </>
  );
};
