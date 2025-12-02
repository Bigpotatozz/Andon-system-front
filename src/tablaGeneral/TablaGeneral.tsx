import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, Dropdown, DropdownItem } from "flowbite-react";
import axios from "axios";
import { convertirSegundos } from "@/helpers/conversorSegundos";

const TablaGeneral = () => {
  const [estaciones, setEstaciones] = useState([]);
  const [lineasRegistradas, setLineasRegistradas] = useState([]);
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(1);

  const obtenerTiempos = async (id: number) => {
    const response = await axios.get(
      `http://localhost:3000/api/estatus/obtenerEstatusEspecifico/${id}`,
    );

    console.log("estatusEspecifico" + response.data.response2);
    setEstaciones(response.data.response2);
  };

  const obtenerEstacionesRegistradas = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/linea/obtenerLineasRegistradas`,
    );

    console.log("lineas registradas");
    console.log(response.data.lineas);
    setLineasRegistradas(response.data.lineas);
  };

  const exportarExcel = () => {
    const datosFormateados = [
      ["ID", "NOMBRE", "NUMERO DE VECES", "COLOR", "TIEMPO TOTAL"],
      ...estaciones.map((estacion) => [
        estacion.idEstacion,
        estacion.nombre,
        estacion.contador,
        estacion.color,
        convertirSegundos(estacion.total),
      ]),
    ];

    const hojaExcel = XLSX.utils.aoa_to_sheet(datosFormateados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, hojaExcel, "Hoja1");
    XLSX.writeFile(workbook, "estaciones.xlsx");
  };
  useEffect(() => {
    obtenerTiempos(estacionSeleccionada);
    obtenerEstacionesRegistradas();
  }, []);

  useEffect(() => {
    obtenerTiempos(estacionSeleccionada);
  }, [estacionSeleccionada]);
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="p-3">
            <strong className="text-white">
              {`Tiempos de estacion ${estacionSeleccionada}`}
            </strong>
          </h1>
        </div>
        <div className="mb-5 flex justify-end gap-3">
          <Dropdown
            className="max-h-60 overflow-y-auto"
            label="Dropdown button"
            dismissOnClick={true}
          >
            {lineasRegistradas.map((estacion, index) => {
              return (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    setEstacionSeleccionada(estacion.idEstacion);
                  }}
                >
                  {estacion.nombre}
                </DropdownItem>
              );
            })}
          </Dropdown>
          <Button color="green" onClick={exportarExcel}>
            Exportar a excel
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Lista de tus estaciones</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {estaciones.map((estacion, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{estacion.nombre}</TableCell>
              <TableCell>{estacion.contador}</TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <div
                    style={{
                      width: "30px",
                      height: "20px",
                      background: `${estacion.color}`,
                      borderRadius: "2px",
                    }}
                  ></div>

                  {estacion.color}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {convertirSegundos(estacion.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaGeneral;
