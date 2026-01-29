import React, { useEffect, useState } from "react";
import { TableroGeneral } from "./TableroGeneral";
import { Dropdown, DropdownItem } from "flowbite-react";
import axios from "axios";

const ContainerTableroGeneral = () => {
  const [lineasRegistradas, setLineasRegistradas] = useState<any[]>([]);
  const [lineaSelected, setLineaSelected] = useState<number>(0);

  const obtenerLineasProduccion = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/linea/");

      console.log("LÍNEAS:", response.data.lineas);

      if (response.data.length < 0) {
        setLineasRegistradas([]);
        return;
      }
      setLineasRegistradas(response.data.lineas || []);
    } catch (error) {
      console.error("Líneas error:", error);
    }
  };

  useEffect(() => {
    obtenerLineasProduccion();
  }, []);

  return (
    <div>
      <TableroGeneral lineaProduccion={lineaSelected}></TableroGeneral>

      <Dropdown
        label={`${lineaSelected > 0 ? lineasRegistradas?.find((id) => lineaSelected === id.idLineaProduccion)?.nombre : "Selecciona línea"}`}
        dismissOnClick
        style={{ background: "" }}
      >
        {lineasRegistradas.length > 0 ? (
          lineasRegistradas.map((linea) => (
            <DropdownItem
              value={linea.nombre}
              key={linea.idLineaProduccion}
              onClick={() => {
                setLineaSelected(linea.idLineaProduccion);
              }}
            >
              {linea.nombre}
            </DropdownItem>
          ))
        ) : (
          <DropdownItem disabled>Cargando líneas...</DropdownItem>
        )}
      </Dropdown>
    </div>
  );
};

export default ContainerTableroGeneral;
