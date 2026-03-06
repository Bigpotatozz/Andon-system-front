import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cpu, Globe, Save } from "lucide-react";
import axios from "axios";
import { usePLCStore } from "@/store/plcStore";

export const ConfigurarPLC = () => {
  const { ip: storedIp, brand: storedBrand, setPLCConfig } = usePLCStore();
  const [ip, setIp] = useState(storedIp);
  const [brand, setBrand] = useState(storedBrand);

  useEffect(() => {
    setIp(storedIp);
    setBrand(storedBrand);
  }, [storedIp, storedBrand]);

  const brands = [
    { id: "keyence", name: "Keyence" },
    { id: "allen-bradley", name: "Allen Bradley" },
    //{ id: "mitsubishi", name: "Mitsubishi" },
    //{ id: "omron", name: "Omron" },
    //{ id: "siemens", name: "Siemens" },
  ];

  const handleSave = async () => {
    try {
      setPLCConfig(ip, brand);
      const plc = await axios.post(
        "http://localhost:3000/api/linea/iniciarPLC",
        {
          ip,
          marca: brand,
        },
      );

      console.log(plc);
      alert("PLC configurado correctamente");
    } catch (error) {
      console.error("Error saving PLC config:", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="fade-in zoom-in w-full max-w-md shadow-xl duration-500">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Configurar PLC
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Ingrese los detalles de conexión para el controlador lógico
            programable.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="ip-address"
              className="flex items-center gap-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Globe className="text-muted-foreground h-4 w-4" />
              Dirección IP
            </label>
            <Input
              id="ip-address"
              placeholder="e.g. 192.168.1.10"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="brand-selection"
              className="flex items-center gap-2 text-sm leading-none font-medium"
            >
              <Cpu className="text-muted-foreground h-4 w-4" />
              Marca del PLC
            </label>
            <div className="group relative">
              <select
                id="brand-selection"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border-muted-foreground/20 bg-background/50 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring hover:border-primary/50 flex h-10 w-full cursor-pointer appearance-none rounded-md border px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {brands.map((b) => (
                  <option
                    key={b.id}
                    value={b.name}
                    className="bg-background text-foreground"
                  >
                    {b.name}
                  </option>
                ))}
              </select>
              <div className="text-muted-foreground group-hover:text-primary pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-colors">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              console.log("IP: ", ip);
              console.log("Marca: ", brand);
              handleSave();
            }}
            className="hover:shadow-primary/20 w-full gap-2 font-semibold shadow-lg transition-all duration-300 active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            Guardar Configuración
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
