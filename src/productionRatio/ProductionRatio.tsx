import { HeaderTurno } from "@/components/myComponents/HeaderTurno";
import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const ProductionRatio = () => {
  const [tiempoLunch, setTiempoLunch] = useState("");
  const [tiempoBreak, setTiempoBreak] = useState("");
  const [tiempoParo, setTiempoParo] = useState("");
  const [tiempoPQ, setTiempoPQ] = useState("");
  const [cicleTime, setCicleTime] = useState(0);

  const [turno, setTurno] = useState(null);
  const [turnoNombre, setTurnoNombre] = useState("");
  const [turnoId, setTurnoId] = useState(0);

  //PETICIONES AL API
  const obtenerTurno = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/turno/obtenerTurno/`,
    );

    console.log("TURNO///////////////////////////");
    console.log(response.data.turno[0]);
    setTurno(response.data.turno[0]);
    setTurnoNombre(response.data.turno[0].nombreTurno);
    setTurnoId(response.data.turno[0].idTurno);

    const idTurnoTemporal = response.data.turno[0].idTurno;

    await obtenerProductionRatio(idTurnoTemporal);
  };

  const obtenerProductionRatio = async (id: number) => {
    const response = await axios.get(
      `http://localhost:3000/api/turno/obtenerProductionRatio/${id}`,
    );

    console.log(response.data.productionRatio[0]);

    if (
      !response.data.productionRatio[0].objetivoProduccionHora ||
      response.data.productionRatio[0].objetivoProduccionHora === 0
    ) {
      console.warn("Objetivo de producción es 0 o no existe");
      setCicleTime(0); // O algún valor por defecto
      return;
    }
    setCicleTime(
      Math.round(
        3600 / response.data.productionRatio[0].objetivoProduccionHora,
      ),
    );
  };

  //HOOKS GENERALES
  useEffect(() => {
    obtenerTurno();
  }, []);

  const navigation = useNavigate();

  const borrarSitema = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/historico/deleteAll",
      );
      console.log(response);

      alert("Sistema reseteado correctamente");
    } catch (e) {
      console.log(e);
    }
  };

  const obtenerEstatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/estatus/obtenerEstatusProductionRatio",
      );

      response.data.response.forEach(
        (e: { colorId: number; tiempoDefinido: string }) => {
          console.log(e);

          switch (e.colorId) {
            case 1011:
              setTiempoLunch(e.tiempoDefinido);
              break;
            case 1012:
              setTiempoBreak(e.tiempoDefinido);
              break;
            case 1013:
              setTiempoParo(e.tiempoDefinido);
              break;
            case 1014:
              setTiempoPQ(e.tiempoDefinido);
              break;
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const activarEstatus = async (colorId: number) => {
    const response = await axios.post(
      "http://localhost:3000/api/estatus/activarEstatus",
      {
        colorId: colorId,
      },
    );

    if (response.status === 200) {
      alert("Estatus activado");
    } else {
      alert("Error al activar estatus");
    }
  };

  const resetearProduccion = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/historico/reset",
    );

    if (response.status === 200) {
      alert("Produccion reseteado correctamente");
    } else {
      alert("Error al resetear produccion");
    }
  };

  useEffect(() => {
    obtenerEstatus();
  }, []);

  const setTime = (
    minuto: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const int = parseInt(minuto);
    if (int > 59 || int < 0) {
      alert("Valores no permitidos");
    }
    setter(`${int}`);
  };

  const updateProductionRatio = async (
    tiempoLunch: string,
    tiempoBreak: string,
    tiempoParo: string,
    tiempoPQ: string,
    turno: number,
    cicleTime: number,
  ) => {
    try {
      await axios.put(
        "http://localhost:3000/api/linea/actualizarProductionRatio",
        {
          lunch: tiempoLunch,
          descanso: tiempoBreak,
          paro: tiempoParo,
          kyt: tiempoPQ,
          turno: turno,
          cicleTime: cicleTime,
        },
      );

      alert("Production ratio actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  const resetTime = () => {
    setTiempoLunch("");
    setTiempoBreak("");
    setTiempoParo("");
    setTiempoPQ("");
    setCicleTime(0);
  };

  return (
    <>
      <HeaderTurno turno={turnoNombre}></HeaderTurno>

      <div className="m-2 rounded-md border border-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Registro de tiempos (min)
            </h2>
          </div>
          <div
            className="flex items-center gap-x-2"
            style={{ width: "fit-content" }}
          >
            <p>Cicle time (seg):</p>
            <TextInput
              type="number"
              style={{ width: "80px" }}
              value={cicleTime}
              onChange={(e) => {
                const numero = parseInt(e.target.value);
                setCicleTime(numero);
              }}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 items-center gap-4 text-center">
          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo de lunch:
            </p>
            <TextInput
              type="number"
              value={tiempoLunch}
              onChange={(e) => {
                setTime(e.target.value, setTiempoLunch);
              }}
            />

            <div className="mt-2 w-full">
              <Button
                style={{ background: "#F5C857", color: "black" }}
                className="w-full"
                onClick={() => {
                  activarEstatus(1011);
                  navigation("/visualizacionGeneral");
                }}
              >
                Lunch
              </Button>
            </div>
          </div>
          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo de break:
            </p>
            <TextInput
              type="number"
              value={tiempoBreak}
              onChange={(e) => {
                setTime(e.target.value, setTiempoBreak);
              }}
            />

            <div className="mt-2 w-full">
              <Button
                className="w-full"
                style={{ background: "#FF9013" }}
                onClick={() => {
                  activarEstatus(1012);
                  navigation("/visualizacionGeneral");
                }}
              >
                Break
              </Button>
            </div>
          </div>

          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo de paro:
            </p>
            <TextInput
              value={tiempoParo}
              type="number"
              onChange={(e) => {
                setTime(e.target.value, setTiempoParo);
              }}
            />

            <div className="mt-2 w-full">
              <Button
                color="red"
                className="w-full"
                onClick={() => {
                  activarEstatus(1013);
                  navigation("/visualizacionGeneral");
                }}
              >
                Paro
              </Button>
            </div>
          </div>

          <div className="text-start">
            <p className="mb-2 text-lg font-semibold">
              Establece el tiempo PQ Time / KYT:
            </p>
            <TextInput
              type="number"
              value={tiempoPQ}
              onChange={(e) => {
                setTime(e.target.value, setTiempoPQ);
              }}
            />

            <div className="mt-2 w-full">
              <Button
                style={{ background: "#08CB00" }}
                className="w-full"
                onClick={() => {
                  activarEstatus(1014);
                  navigation("/visualizacionGeneral");
                }}
              >
                PQ Time
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button
            color="green"
            style={{ width: "100%" }}
            onClick={() => {
              if (isNaN(cicleTime) || cicleTime <= 0) {
                alert("Ingresa un numero valido");
                return;
              }

              localStorage.setItem("cicleTime", `${cicleTime}`);
              updateProductionRatio(
                tiempoLunch,
                tiempoBreak,
                tiempoParo,
                tiempoPQ,
                1,
                cicleTime,
              );
            }}
          >
            Guardar
          </Button>
        </div>

        <div className="mt-4">
          <Button
            color="blue"
            style={{ width: "100%" }}
            onClick={() => {
              activarEstatus(1015);
              navigation("/visualizacionGeneral");
            }}
          >
            Reanudar produccion
          </Button>
        </div>
      </div>

      <div className="m-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resetear datos de producción
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Esta acción eliminará todos los datos actuales
            </p>
          </div>
          <Button color="red" onClick={resetearProduccion}>
            Resetear
          </Button>
        </div>
      </div>

      <div className="m-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activar production ratio
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Esta accion activara el production ratio
            </p>
          </div>
          <Button color="blue">Activar</Button>
        </div>
      </div>

      <div className="m-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resetar información
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Esta accion reseteara toda la información previamente puesta
            </p>
          </div>
          <Button
            color="yellow"
            onClick={() => {
              resetTime();
            }}
          >
            Resetear
          </Button>
        </div>
      </div>

      <div className="m-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Restablecer sistema
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Esta accion borrara toda la información de la base de datos.
            </p>
          </div>
          <Button
            color="red"
            onClick={() => {
              borrarSitema();
            }}
          >
            Restablecer
          </Button>
        </div>
      </div>
    </>
  );
};
