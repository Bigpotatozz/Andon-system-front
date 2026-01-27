import { useEffect, useState } from "react";
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
  interface Estacion {
    idEstacion: number;
    nombre: string;
    contador: number;
    color: string;
    total: number;
  }

  interface LineaProduccion {
    idLineaProduccion: number;
    nombre: string;
  }

  interface EstacionRegistrada {
    idEstacion: number;
    nombre: string;
  }

  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const [lineasProduccionRegistradas, setLineasProduccionRegistradas] =
    useState<LineaProduccion[]>([]);
  const [lineaProduccionSelected, setLineaProduccionSelected] =
    useState<number>(0);
  const [estacionesRegistradas, setEstacionesRegistradas] = useState<
    EstacionRegistrada[]
  >([]);
  const [estacionSeleccionada, setEstacionSeleccionada] = useState<number>(1);
  const [allTiempos, setAllTiempos] = useState<any[]>([]);

  const obtenerLineasProduccion = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/linea/");

      console.log("LÍNEAS:", response.data.lineas);
      setLineasProduccionRegistradas(response.data.lineas || []);
    } catch (error) {
      console.error("Líneas error:", error);
    }
  };

  const obtenerEstacionesRegistradas = async (idLinea: number) => {
    if (!idLinea || idLinea <= 0) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/linea/obtenerEstacionesPorLinea/${idLinea}`,
      );

      console.log("ESTACIONES:", response.data.estaciones);
      setEstacionesRegistradas(response.data.estaciones || []);
    } catch (error) {
      console.error("Estaciones error:", error);
    }
  };

  const obtenerTiempos = async (id: number) => {
    if (!id || id <= 0) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/linea/obtenerEstacionesTiempos/${id}`,
      );

      console.log("TIEMPOS:", response.data);
      setEstaciones(response.data.response || response.data.tiempos || []);
    } catch (error) {
      console.error("Tiempos error:", error);
    }
  };

  const exportarExcel = () => {
    const datosFormateados = [
      ["ID", "NOMBRE", "VECES", "COLOR", "TOTAL"],
      ...allTiempos.map((estacion: any) => [
        estacion.idEstacion || "-",
        estacion.nombre || "-",
        estacion.contador || 0,
        estacion.color || "-",
        convertirSegundos(estacion.total || 0),
      ]),
    ];

    const hojaExcel = XLSX.utils.aoa_to_sheet(datosFormateados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, hojaExcel, "Estaciones");
    XLSX.writeFile(workbook, `estaciones_${Date.now()}.xlsx`);
  };

  useEffect(() => {
    obtenerLineasProduccion();
  }, []);

  useEffect(() => {
    if (lineaProduccionSelected > 0) {
      obtenerEstacionesRegistradas(lineaProduccionSelected);
    }
  }, [lineaProduccionSelected]);

  useEffect(() => {
    if (estacionSeleccionada > 0) {
      obtenerTiempos(estacionSeleccionada);
    }
  }, [estacionSeleccionada]);

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {estacionSeleccionada > 0
            ? `Tiempos estación ${estacionSeleccionada}`
            : "Selecciona estación"}
        </h1>

        <div className="flex items-center gap-4">
          <Dropdown label="Línea de producción" dismissOnClick>
            {lineasProduccionRegistradas.length > 0 ? (
              lineasProduccionRegistradas.map((linea) => (
                <DropdownItem
                  key={linea.idLineaProduccion}
                  onClick={() =>
                    setLineaProduccionSelected(linea.idLineaProduccion)
                  }
                >
                  {linea.nombre}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem disabled>Cargando líneas...</DropdownItem>
            )}
          </Dropdown>

          <Dropdown label="Estación" dismissOnClick>
            {estacionesRegistradas.length > 0 ? (
              estacionesRegistradas.map((estacion) => (
                <DropdownItem
                  key={estacion.idEstacion}
                  onClick={() => setEstacionSeleccionada(estacion.idEstacion)}
                >
                  {estacion.nombre}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem disabled>Selecciona línea primero</DropdownItem>
            )}
          </Dropdown>

          <Button
            color="success"
            onClick={exportarExcel}
            style={{ background: "#107c41" }}
          >
            Exportar Excel
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Estados y tiempos acumulados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Estado</TableHead>
            <TableHead className="w-[100px]">Veces</TableHead>
            <TableHead className="w-[120px]">Color</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estaciones.length > 0 ? (
            estaciones.map((estacion, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{estacion.nombre}</TableCell>
                <TableCell>{estacion.contador}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-5 w-8 rounded"
                      style={{ backgroundColor: estacion.color }}
                    />
                    <span className="text-xs">{estacion.color}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {convertirSegundos(estacion.total)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground h-24 text-center"
              >
                Selecciona una estación para ver tiempos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaGeneral;
