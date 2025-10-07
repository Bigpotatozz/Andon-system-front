import axios from "axios";
import { TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const ConfigLineas = () => {
  const navegacion = useNavigate();

  const [linea1, setLinea1] = useState("");
  const [linea2, setLinea2] = useState("");
  const [linea3, setLinea3] = useState("");
  const [linea4, setLinea4] = useState("");
  const [linea5, setLinea5] = useState("");
  const [linea6, setLinea6] = useState("");
  const [linea7, setLinea7] = useState("");

  const [lineas, setLineas] = useState([""]);

  const postLineas = async (lineasGuardar: string[]) => {
    const response = await axios.post(
      "http://localhost:3000/api/linea/crearLinea",
      {
        nombres: lineasGuardar,
      },
    );

    console.log(response);
  };

  const agregarLineas = (newLines: string[]) => {
    setLineas(newLines);
    postLineas(newLines);
  };

  useEffect(() => {
    console.log(lineas);
  }, [lineas]);

  return (
    <>
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <p>Nombre de linea:</p>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            onChange={(e) => {
              setLinea1(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <p>Nombre de linea:</p>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            onChange={(e) => {
              setLinea2(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <p>Nombre de linea:</p>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            onChange={(e) => {
              setLinea3(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <p>Nombre de linea:</p>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            onChange={(e) => {
              setLinea4(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <p>Nombre de linea:</p>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            onChange={(e) => {
              setLinea5(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <p>Nombre de linea:</p>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            onChange={(e) => {
              setLinea6(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <p>Nombre de linea:</p>
          </div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            onChange={(e) => {
              setLinea7(e.target.value);
            }}
          />
        </div>
      </div>

      <Button
        color="green"
        onClick={() => {
          agregarLineas([
            linea1,
            linea2,
            linea3,
            linea4,
            linea5,
            linea6,
            linea7,
          ]);
          navegacion("/configuracionBotones");
        }}
      >
        Finalizar
      </Button>
    </>
  );
};
