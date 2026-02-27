import { Input } from "@/components/ui/input";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export const FormTurnos = ({ lineas }: { lineas: any }) => {
  const [cicleTime, setCicleTime] = useState(0);
  return (
    <div>
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-bold text-white">{lineas.nombre}</h2>

          <div>
            <div className="flex items-center justify-between">
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
          </div>
        </div>

        {lineas.turno.map((e: any, index: number) => {
          return (
            <div key={index}>
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
                <div>
                  <Label htmlFor={`turno${index}`}>
                    Nombre de turno {index + 1}:
                  </Label>
                  <Input
                    id={`turno${index}`}
                    type="text"
                    value={e.nombreTurno}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="time-picker" className="px-1">
                    Hora de inicio
                  </Label>
                  <Input
                    value={e.horaInicio}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    type="time"
                    id="time-picker"
                    step="1"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
                <div>
                  <Label htmlFor="time-picker" className="px-1">
                    Hora de fin
                  </Label>
                  <Input
                    value={e.horaFin}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    type="time"
                    id="time-picker"
                    step="1"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <Button className="mt-5 w-full" color={"green"}>
          Confirmar cambios
        </Button>
      </div>
    </div>
  );
};
