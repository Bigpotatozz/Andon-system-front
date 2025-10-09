import axios from "axios";
import { TextInput, Button, Label } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const ConfigLineas = () => {
  const navegacion = useNavigate();
  const [lineas, setLineas] = useState(new Array(10).fill(""));
  const [lineas2, setLineas2] = useState(new Array(10).fill(""));
  const [lineas3, setLineas3] = useState(new Array(10).fill(""));

  let lineasGeneral: string[] = [];

  let idsLineas: number[] = [];

  const unirArreglo = (
    lineas1: string[],
    lineas2: string[],
    lineas3: string[],
  ) => {
    const lineasLimpias1 = lineas1.filter((e) => e != "");
    const lineasLimpias2 = lineas2.filter((e) => e != "");
    const lineasLimpias3 = lineas3.filter((e) => e != "");

    const arregloUnido = [
      ...lineasLimpias1,
      ...lineasLimpias2,
      ...lineasLimpias3,
    ];

    lineasGeneral = arregloUnido;
  };

  const postLineas = async (lineasTotales: string[]) => {
    const response = await axios.post(
      "http://localhost:3000/api/linea/crearLinea",
      {
        nombres: lineasTotales,
      },
    );

    idsLineas = response.data.idsLineas;

    localStorage.setItem("idsLineas", JSON.stringify(idsLineas));
    console.log(response);
  };

  const agregarLinea = (
    e: React.ChangeEvent<HTMLInputElement>,
    indice: number,
    setLineaParametro: React.Dispatch<React.SetStateAction<string[]>>,
    linea: string[],
  ) => {
    const lineasModificadas = [...linea];
    lineasModificadas[indice] = e.target.value;
    setLineaParametro(lineasModificadas);
  };

  return (
    <>
      <div className="align-center flex flex-col items-center justify-center">
        <h1 className="mt-5 text-center text-lg font-bold text-white">
          Registra tus lineas de produccion:
        </h1>
        <div className="flex w-full">
          <div className="g-10 w-full p-10">
            {lineas.map((e, index) => {
              return (
                <>
                  <div className="mb-2 block" key={index}>
                    <Label htmlFor="small">Nombre de linea {index + 1}:</Label>
                  </div>
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    className="w-full"
                    onChange={(e) => {
                      agregarLinea(e, index, setLineas, lineas);
                    }}
                  />
                </>
              );
            })}
          </div>
          <div className="g-10 w-full p-10">
            {lineas2.map((e, index) => {
              return (
                <>
                  <div className="mb-2 block" key={index}>
                    <Label htmlFor="small">Nombre de linea {index + 1}:</Label>
                  </div>
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    className="w-full"
                    onChange={(e) => {
                      agregarLinea(e, index, setLineas2, lineas2);
                    }}
                  />
                </>
              );
            })}
          </div>
          <div className="g-10 w-full p-10">
            {lineas3.map((e, index) => {
              return (
                <>
                  <div className="mb-2 block" key={index}>
                    <Label htmlFor="small">Nombre de linea {index + 1}:</Label>
                  </div>
                  <TextInput
                    id="small"
                    type="text"
                    sizing="sm"
                    className="w-full"
                    onChange={(e) => {
                      agregarLinea(e, index, setLineas3, lineas3);
                    }}
                  />
                </>
              );
            })}
          </div>
        </div>

        <Button
          color="green"
          className="m-5"
          onClick={() => {
            unirArreglo(lineas, lineas2, lineas3);

            if (lineasGeneral.length <= 0) {
              alert("Registra al menos una linea");
              return;
            }

            setTimeout(() => {
              postLineas(lineasGeneral);
            }, 2000);
            navegacion("/configuracionBotones");
          }}
        >
          Registrar lineas
        </Button>
      </div>
    </>
  );
};
