import { Card } from "flowbite-react";
import { Link } from "react-router";

export const Menu = () => {
  return (
    <>
      <div className="p-10">
        <Link to={"/configuracionBotones"}>
          <Card href="#" className="p-10">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Configurar nueva linea
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Configura los colores y canciones de tu nueva linea de produccion.
            </p>
          </Card>
        </Link>
      </div>
    </>
  );
};
