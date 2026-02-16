import axios from "axios";
import { useEffect, useState } from "react";
import { FormTurnos } from "./components/FormTurnos";

export const ConfiguracionTurno = () => {
  const [lineas, setLineas] = useState([]);

  const getLineasTurnos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/turno/obtenerTurnos",
      );

      console.log(response.data.lineas);

      setLineas(response.data.lineas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLineasTurnos();
  }, []);
  return (
    <div>
      {lineas.map((e) => {
        return <FormTurnos lineas={e}></FormTurnos>;
      })}
    </div>
  );
};
