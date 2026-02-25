import { useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Columns3Cog, Dice1, Dice6, Table2Icon } from "lucide-react";
import axios from "axios";
import { OEEAcumulado } from "./components/OEEAcumulado";
import { useEffect, useState } from "react";

//Component que almacena el menu principal, este es el endpoint de la aplicacion.
export const Menu = () => {
  //state para navegar entre las diferentes
  const navegacion = useNavigate();

  const [oee, setOee] = useState([]);
  //PETICIONES AL API
  const verificarLinea = async (id: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/linea/verificarExistenciaLinea/${id}`,
    );

    return response.data;
  };

  const obtenerOEE = async () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();

    const fechaInicio = new Date(año, mes, 1).toISOString().split("T")[0];

    const fechaFin = new Date(año, mes + 1, 0).toISOString().split("T")[0];

    const response = await axios.get(
      `http://localhost:3000/api/analisis/obtenerOEE?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
    );

    setOee(response.data);
  };
  useEffect(() => {
    obtenerOEE();
  }, []);

  return (
    <>
      <div className="mt-5">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Análisis de Desempeño
            </CardTitle>
            <CardDescription>
              Resumen del OEE acumulado por línea y turno
            </CardDescription>
          </CardHeader>

          <div className="flex flex-wrap justify-center gap-2.5">
            {oee.map((e) => (
              <OEEAcumulado
                key={e.idLineaProduccion}
                idLineaProduccion={e.idLineaProduccion}
                nombreLinea={e.lineaProduccion}
                nombreTurno={e.nombreTurno}
                objetivo={e.totalObjetivo}
                realizado={e.totalRealizado}
                porcentaje={e.porcentajeCumplimiento}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="opciones mt-5 flex gap-5">
        <div className="opcion1 md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Configurar nuevas lineas</CardTitle>
              <CardDescription>
                Establece el nombre de cada línea, define el peso de cada color
                para el sistema de alertas visuales y asigna el sonido que se
                reproducirá cuando se requiera atención.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5 p-5">
              <Columns3Cog size={50}></Columns3Cog>
              <Button
                onClick={() => {
                  navegacion("/configuracionLineas");
                }}
              >
                Configurar lineas
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="opcion2 md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Tablero general</CardTitle>
              <CardDescription>
                Monitorea el estado operativo de todas tus líneas de producción
                en tiempo real. Visualiza indicadores de rendimiento, alertas
                activas y el estado actual de cada línea desde un solo panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5 p-5">
              <Dice6 size={50}></Dice6>
              <Button
                onClick={() => {
                  navegacion("/tableroGeneral");
                }}
              >
                Ver tablero general
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="opcion3 md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>
                Optimice el seguimiento de su planta mediante el acceso a los
                reportes individuales de cada línea de producción. El sistema le
                permite consolidar estos indicadores y exportarlos a formato
                Excel.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5 p-5">
              <Table2Icon size={50}></Table2Icon>
              <Button
                onClick={() => {
                  navegacion("/tablaGeneral");
                }}
              >
                Ver reportes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
