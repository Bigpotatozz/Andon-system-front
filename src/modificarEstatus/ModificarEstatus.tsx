import { Estatus } from "@/Models/Estatus";
import { LineaCard } from "@/tableroGeneral/components/LineaCard";
import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

const ModificarEstatus = () => {
  //Accede al arreglo de ids previamente guardados en el localStorage
  let estacionesIds = localStorage.getItem("idsEstaciones");
  //Las parsea para poder usarlas
  estacionesIds = estacionesIds ? JSON.parse(estacionesIds) : [];

  //Declara un arreglo de estatus y los inicializa (hook)
  const [estatus, setEstatus] = useState<any[]>([
    new Estatus("#49FF00", 1000, 0, ""),
    new Estatus("#FBFF00", 1001, 0, ""),
    new Estatus("#FF9300", 1002, 0, ""),
    new Estatus("#FF0000", 1003, 0, ""),
    new Estatus("#0046FF", 1004, 0, ""),
    new Estatus("#7B542F", 1005, 0, ""),
    new Estatus("#3338A0", 1006, 0, ""),
    new Estatus("#2DCDDF", 1007, 0, ""),
    new Estatus("#B6EB7A", 1008, 0, ""),
    new Estatus("#F6ACC8", 1009, 0, ""),
  ]);

  //PETICIONES AL API

  const obtenerEstatusRegistrados = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/estatus/obtenerEstatusModificar",
    );

    setEstatus(response.data.estatus);

    console.log(estatus);
  };

  const actualizarEstatus = async (estatus: any[]) => {
    const response = await axios.put(
      "http://localhost:3000/api/estatus/modificarEstatus",

      {
        ids: estatus,
      },
    );

    console.log(response);
  };

  //Funcion que se encarga de actualizar el peso de cada uno de los estatus
  const actualizarPeso = (indice: number, peso: number | string) => {
    setEstatus((prev) => {
      const nuevoArray = [...prev];
      nuevoArray[indice] = { ...nuevoArray[indice], prioridad: peso };
      return nuevoArray;
    });
  };

  useEffect(() => {
    obtenerEstatusRegistrados();
  }, []);
  //En el html se instancia otro componente donde se le pasa como prop la funcion de actualizacion
  //esto para que al hijo pueda modificar datos del padre
  return (
    <>
      <div className="h-full text-center">
        <h1 className="text-center text-lg font-bold text-white">
          Modifica tus estatus:
        </h1>
        <div className="flex flex-col p-3">
          <div className="mb-6 flex justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-3">
              {estatus.map((objeto, index) => (
                <>
                  <div className="flex justify-center gap-2">
                    <div
                      className={`h-10 w-3 rounded-xl border`}
                      style={{ backgroundColor: objeto.color }}
                    ></div>
                    <TextInput
                      type="number"
                      key={index}
                      value={objeto.prioridad}
                      onChange={(e) => {
                        actualizarPeso(index, e.target.value);
                      }}
                    ></TextInput>
                  </div>
                </>
              ))}
            </div>

            <div className="flex max-w-2xl flex-wrap">
              {estatus.slice(4).map((e, index) => {
                return (
                  <LineaCard
                    color={e.color}
                    estatus={10}
                    tiempo="00:10:01"
                    nombre={`P${index}`}
                  ></LineaCard>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex justify-center">
              <Button
                color="blue"
                onClick={() => {
                  console.log(estatus);
                  actualizarEstatus(estatus);
                }}
              >
                Confirmar cambios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModificarEstatus;
