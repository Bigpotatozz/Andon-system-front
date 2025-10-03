import { Button, ButtonGroup, TextInput } from "flowbite-react";
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";

export const ConfiguracionBotones = () => {
  const [botones, setBotones] = useState([{ color: "#B4E50D", nombre: "" }]);

  const agregarColor = () => {
    if (botones.length >= 10) {
      alert("Solo se puede un maximo de 10 colores");
      return;
    }
    setBotones([...botones, { color: "#B4E50D", nombre: "" }]);
  };

  const cambiarColor = (index, nuevoColor) => {
    const nuevosBotones = [...botones];
    nuevosBotones[index] = {
      ...nuevosBotones[index],
      color: nuevoColor,
    };
    setBotones(nuevosBotones);

    console.log(botones);
  };

  const cambiarNombre = (index, nuevoNombre) => {
    const nuevosBotones = [...botones];
    nuevosBotones[index] = { ...nuevosBotones[index], nombre: nuevoNombre };
    setBotones(nuevosBotones);
  };

  return (
    <>
      <h1>Botones funcionando</h1>

      <div className="flex flex-col items-center">
        {botones.map((boton, index) => (
          <div
            key={index}
            className="align-center flex place-content-center items-center justify-center gap-2"
          >
            <Label className="mb-2 block" htmlFor="file-upload">
              Upload file
            </Label>
            <FileInput id="file-upload" />

            <TextInput
              className=""
              value={boton.nombre}
              onChange={(e) => cambiarNombre(index, e.target.value)}
            ></TextInput>
            <ButtonGroup>
              <Button
                color="green"
                onClick={() => cambiarColor(index, "#B4E50D")}
              ></Button>
              <Button
                color="red"
                onClick={() => cambiarColor(index, "#FF0000")}
              ></Button>
              <Button
                color="yellow"
                onClick={() => cambiarColor(index, "#FFFF00")}
              ></Button>
              <Button color="orange"></Button>
              <Button color="blue"></Button>
              <Button color="purple"></Button>
              <Button color="pink"></Button>
              <Button color="cyan"></Button>
              <Button color="teal"></Button>
            </ButtonGroup>
          </div>
        ))}

        <div className="flex gap-4">
          <Button
            color="green"
            onClick={agregarColor}
            disabled={botones.length >= 10}
          >
            Agregar color
          </Button>

          <Button
            color="blue"
            onClick={() => {
              console.log(botones);
            }}
          >
            Guardar estados
          </Button>
        </div>
      </div>
    </>
  );
};
