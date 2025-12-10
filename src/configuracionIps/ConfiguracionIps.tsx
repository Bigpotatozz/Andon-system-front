import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

const ConfiguracionIps = () => {
  const [estaciones, setEstaciones] = useState<any>([]);

  //PETICIONES AL API
  const obtenerEstacionesRegistradas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/linea/obtenerLineasRegistradas",
      );

      setEstaciones(response.data.lineas);
    } catch (e) {
      console.log(e);
    }
  };

  const registrarIps = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/linea/registrarIp",
        {
          estaciones: estaciones,
        },
      );

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  //FUNCIONES
  const agregarIp = (indice: number, ip: string) => {
    const estacionesCopy = [...estaciones];

    estacionesCopy[indice].ip = ip;

    setEstaciones(estacionesCopy);
  };
  useEffect(() => {
    obtenerEstacionesRegistradas();
  }, []);

  //VALIDACIONES
  const validarIp = (ip: string) => {
    const splittedIp = ip.split(".");

    const state = splittedIp.some((e) => {
      const parsedIpPart = parseInt(e);

      if (isNaN(parsedIpPart)) {
        alert("Direccion ip invalida");
        return true;
      }

      return false;
    });

    return state;
  };
  return (
    <div>
      <>
        <div className="mb-10 rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Direcciones IP</h2>

          {estaciones && estaciones.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-sm text-gray-300">
                <thead className="bg-gray-700 text-white uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Identificador
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Nombre
                    </th>
                    <th className="px-60 py-3 text-left font-semibold">
                      Direccion ip
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {estaciones.map((estacion: any, index: number) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-750 bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">
                        {estacion.idEstacion}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {`Estacion: ${estacion.nombre}`}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        <Input
                          id={`turno${index}`}
                          type="text"
                          value={estacion.ip}
                          onChange={(e) => {
                            agregarIp(index, e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-400">No hay estaciónes registradas aún</p>
            </div>
          )}

          <Button
            color="green"
            className="mt-6 w-full"
            onClick={() => {
              const validaciones: any = [];

              estaciones.forEach((e: any) => {
                const estatus = validarIp(e.ip);

                validaciones.push(estatus);
              });
              const passed = validaciones.some((v: any) => {
                if (v === true) {
                  return true;
                }
                return false;
              });

              console.log(passed);

              if (passed != true) {
                registrarIps();
                alert("Direcciones IP registradas correctamente");
              }
            }}
          >
            Registar IP
          </Button>
        </div>
      </>
    </div>
  );
};

export default ConfiguracionIps;
