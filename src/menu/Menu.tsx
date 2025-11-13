import { useNavigate } from "react-router";
import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Columns3Cog, Dice1, Dice6 } from "lucide-react";
import axios from "axios";

//Component que almacena el menu principal, este es el endpoint de la aplicacion.
export const Menu = () => {
  //state para navegar entre las diferentes
  const navegacion = useNavigate();

  //Funcion que ejecuta el navigate para redirigirse a otra pagina
  const onClickLinea = async (idLinea: string) => {
    try {
      const response = await verificarLinea(idLinea);
      if (!response.linea) {
        alert("La linea de produccion indicada no existe");
        return;
      }
      navegacion(`/tableroLinea/${idLinea}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al verificar la línea");
    }
  };

  const verificarLinea = async (id: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/linea/verificarExistenciaLinea/${id}`,
    );

    console.log(response);
    return response.data;
  };

  const data = [
    {
      fecha: "01/11/2025",
      produccion: 450,
      paros: 45,
      eficiencia: 91,
    },
    {
      fecha: "02/11/2025",
      produccion: 520,
      paros: 30,
      eficiencia: 95,
    },
    {
      fecha: "03/11/2025",
      produccion: 380,
      paros: 85,
      eficiencia: 82,
    },
    {
      fecha: "04/11/2025",
      produccion: 490,
      paros: 50,
      eficiencia: 91,
    },
    {
      fecha: "05/11/2025",
      produccion: 510,
      paros: 40,
      eficiencia: 93,
    },
    {
      fecha: "06/11/2025",
      produccion: 470,
      paros: 60,
      eficiencia: 89,
    },
    {
      fecha: "07/11/2025",
      produccion: 530,
      paros: 25,
      eficiencia: 96,
    },
  ];

  //Frontend
  return (
    <>
      <div className="p-2 text-center">
        <div className="bg-card rounded-lg">
          <h1 className="p-3">
            <strong className="text-white">Analisis</strong>
          </h1>
          {/*GRAFICA QUE INDICA LA EFICIENCIA, LOS PAROS DE TIPO ROJO Y LAS UNIDADES PRODUCIDAS*/}
          <div className="md-xl mx-auto rounded-lg p-6 shadow-lg">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffffff" />
                <XAxis
                  dataKey="fecha"
                  stroke="#ffffffff"
                  style={{ fontSize: 12 }}
                />
                <YAxis stroke="#ffffffff" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />

                <Line
                  type="monotone"
                  dataKey="produccion"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Producción (unidades)"
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 8 }}
                />

                <Line
                  type="monotone"
                  dataKey="paros"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Paros (minutos)"
                  dot={{ fill: "#ef4444", r: 5 }}
                  activeDot={{ r: 8 }}
                />

                <Line
                  type="monotone"
                  dataKey="eficiencia"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Eficiencia (%)"
                  dot={{ fill: "#3b82f6", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-600">
                  Producción Promedio
                </p>
                <p className="text-2xl font-bold text-green-700">
                  480 unidades
                </p>
              </div>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-600">
                  Paros Promedio
                </p>
                <p className="text-2xl font-bold text-red-700">48 minutos</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-600">
                  Eficiencia Promedio
                </p>
                <p className="text-2xl font-bold text-blue-700">91%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="opciones mt-5 flex gap-5">
          <div className="opcion1 md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Configurar nuevas lineas</CardTitle>
                <CardDescription>
                  Establece el nombre de cada línea, define el peso de cada
                  color para el sistema de alertas visuales y asigna el sonido
                  que se reproducirá cuando se requiera atención.
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
                  Monitorea el estado operativo de todas tus líneas de
                  producción en tiempo real. Visualiza indicadores de
                  rendimiento, alertas activas y el estado actual de cada línea
                  desde un solo panel.
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
                <CardTitle>Tablero de linea</CardTitle>
                <CardDescription>
                  Accede al monitoreo detallado de una línea de producción
                  específica. Visualiza su estado actual en tiempo real, tiempos
                  de ciclo, duración de eventos y métricas individuales de
                  rendimiento.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-5 p-5">
                <Dice1 size={50}></Dice1>
                <Button
                  onClick={() => {
                    const idLinea = prompt("ID DE LA LINEA:");

                    if (idLinea === null || idLinea == "0") {
                      alert("Debes introducir un ID");
                      return;
                    } else {
                      onClickLinea(idLinea);
                    }
                  }}
                >
                  Configurar lineas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
