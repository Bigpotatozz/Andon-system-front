import { Card } from "flowbite-react";
import { Link } from "react-router";

export const Menu = () => {
  return (
    <>
      <div className="general flex min-h-screen flex-col items-center justify-center p-6">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex">
            <Link to={"/configuracionLineas"} className="w-full">
              <Card className="flex h-full flex-col justify-between !bg-sky-600 p-10">
                <div>
                  <h5 className="mb-4 text-2xl font-bold tracking-tight dark:text-white">
                    Configurar nueva linea
                  </h5>
                  <p className="font-normal text-white">
                    Configura los colores y canciones de tu nueva linea de
                    produccion.
                  </p>
                </div>
              </Card>
            </Link>
          </div>

          <div className="flex">
            <Link to={"/tableroGeneral"} className="w-full">
              <Card className="flex h-full flex-col justify-between !bg-green-600 p-10">
                <div>
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Tablero general
                  </h5>
                  <p className="font-normal text-white">
                    Visualiza el estado de todas tus lineas de produccion
                  </p>
                </div>
              </Card>
            </Link>
          </div>

          <div className="flex">
            <Link to={"/configuracionLineas"} className="w-full">
              <Card className="flex h-full flex-col justify-between !bg-orange-500 p-10">
                <div>
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Analisis
                  </h5>
                  <p className="font-normal text-white">
                    Visualiza con metricas el estado de cada una de tus lineas
                  </p>
                </div>
              </Card>
            </Link>
          </div>

          <div className="flex">
            <Link to={"/configuracionLineas"} className="w-full">
              <Card className="flex h-full flex-col justify-between !bg-violet-500 p-10">
                <div>
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Tablero de linea
                  </h5>
                  <p className="font-normal text-white">
                    Visualiza con metricas el estado una linea de produccion en
                    especifico
                  </p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
