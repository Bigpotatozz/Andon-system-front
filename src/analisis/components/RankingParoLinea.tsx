import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertirSegundos } from "@/helpers/conversorSegundos";

export const RankingParoLinea = () => {
  const [ranking, setRanking] = useState<any>([]);

  const obtenerRanking = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/analisis/obtenerRankingParosLinea",
      );
      const data = await response.json();
      setRanking(data);
    } catch (error) {
      console.error("Error al obtener el ranking:", error);
    }
  };

  useEffect(() => {
    obtenerRanking();
  }, []);

  return (
    <div className="bg-dark rounded-lg shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          Ranking de Paros por Línea
        </h2>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-700">
        <Table className="bg-dark">
          <TableHeader className="bg-gray-800/50">
            <TableRow className="border-gray-700 hover:bg-transparent">
              <TableHead className="w-[50px] text-gray-300">#</TableHead>
              <TableHead className="text-left text-gray-300">
                Línea de Producción
              </TableHead>
              <TableHead className="text-center text-gray-300">
                Cantidad de Paros
              </TableHead>
              <TableHead className="text-right text-gray-300">
                Tiempo Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ranking.map((row: any, index: number) => (
              <TableRow
                key={row.idLineaProduccion}
                className="group border-gray-700 transition-colors hover:bg-gray-800/30"
              >
                <TableCell className="font-medium text-gray-400">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs text-white group-hover:bg-gray-700">
                    {index + 1}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-white">
                  {row.nombre}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 font-semibold text-gray-300">
                    {row.cantidadTotal}
                  </div>
                </TableCell>
                <TableCell className="text-right text-white">
                  <div className="flex items-center justify-end gap-1 font-mono text-lg font-bold">
                    {convertirSegundos(row.tiempoTotal)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <p className="text-xs text-gray-500 italic">
          * Datos calculados en base a los paros registrados en el sistema.
        </p>
      </div>
    </div>
  );
};
