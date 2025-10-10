import { Card } from "flowbite-react";
import { Link } from "react-router";

export const Menu = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="p-5">
          <Link to={"/configuracionLineas"}>
            <Card className="!bg-sky-600 p-10">
              <h5 className="text-2xl font-bold tracking-tight dark:text-white">
                Configurar nueva linea
              </h5>
              <p className="font-normal text-white">
                Configura los colores y canciones de tu nueva linea de
                produccion.
              </p>
            </Card>
          </Link>
        </div>

        <div className="p-5">
          <Link to={"/tableroGeneral"}>
            <Card className="!bg-green-600 p-10">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tablero general
              </h5>
              <p className="font-normal text-white">
                Visualiza el estado de todas tus lineas de produccion
              </p>
            </Card>
          </Link>
        </div>
      </div>

      <div className="pt-0 pr-10 pl-10">
        <div className="p-5">
          <Link to={"/configuracionLineas"}>
            <Card className="!bg-orange-500 p-10">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Analisis
              </h5>
              <p className="font-normal text-white">
                Visualiza con metricas el estado de cada una de tus lineas
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
};
