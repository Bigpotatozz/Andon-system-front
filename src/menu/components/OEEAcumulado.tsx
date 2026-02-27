import { Card, CardContent } from "@/components/ui/card";
import { Dice1 } from "lucide-react";

interface OEEAcumuladoProps {
  idLineaProduccion: number;
  nombreLinea: string;
  nombreTurno: string;
  objetivo: number;
  realizado: number;
  porcentaje: string;
}

export const OEEAcumulado = ({
  nombreLinea,
  nombreTurno,
  objetivo,
  realizado,
  porcentaje,
}: OEEAcumuladoProps) => {
  return (
    <div className="w-full p-3 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <Card className="from-background to-muted/40 border-none bg-gradient-to-br shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl">
        <CardContent className="pr-5 pl-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-md p-2">
                <Dice1 className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 text-base leading-none font-bold tracking-tight">
                  {nombreLinea}
                </h3>
                <div className="flex items-center gap-1.5 opacity-70">
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    {nombreTurno}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="space-y-1 text-center">
              <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
                Objetivo
              </p>
              <p className="text-sm font-black tabular-nums">
                {objetivo.toLocaleString()}
              </p>
            </div>

            <div className="space-y-1 text-center">
              <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
                Porcentaje
              </p>
              <p className="text-sm font-black tabular-nums">
                {parseFloat(porcentaje).toFixed(2)}%
              </p>
            </div>
            <div className="space-y-1 text-center text-right">
              <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
                Realizado
              </p>
              <p
                className="text-center text-sm font-black tabular-nums"
                style={{ color: realizado >= objetivo ? "#22c55e" : "inherit" }}
              >
                {realizado.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
