import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ConfiguracionBotones } from "./configuracionBotones/ConfiguracionBotones.tsx";
import { ConfigLineas } from "./configLineas/ConfigLineas.tsx";
import { Menu } from "./menu/Menu.tsx";
import { TableroGeneral } from "./tableroGeneral/TableroGeneral.tsx";
import { TableroIndividual } from "./tableroIndividual/TableroIndividual.tsx";
import Analisis from "./analisis/Analisis.tsx";
import { ProductionRatio } from "./productionRatio/ProductionRatio.tsx";
import VisualizacionGeneral from "./visualizacionGeneral/VisualizacionGeneral.tsx";
import TablaGeneral from "./tablaGeneral/TablaGeneral.tsx";
import ModificarEstatus from "./modificarEstatus/ModificarEstatus.tsx";

//Declaracion de rutas de react router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ThemeInit />
        <App />
      </>
    ),
    children: [
      {
        index: true,
        element: <Menu></Menu>,
      },
      {
        path: "/configuracionBotones",
        element: <ConfiguracionBotones></ConfiguracionBotones>,
      },
      {
        path: "/configuracionLineas",
        element: <ConfigLineas></ConfigLineas>,
      },
      {
        path: "/tableroGeneral",
        element: <TableroGeneral></TableroGeneral>,
      },
      {
        path: "/tableroLinea/:idLinea",
        element: <TableroIndividual></TableroIndividual>,
      },
      {
        path: "/analisis",
        element: <Analisis></Analisis>,
      },
      {
        path: "/productionRatio",
        element: <ProductionRatio></ProductionRatio>,
      },
      {
        path: "/visualizacionGeneral",
        element: <VisualizacionGeneral></VisualizacionGeneral>,
      },
      { path: "/tablaGeneral", element: <TablaGeneral></TablaGeneral> },
      {
        path: "/modificarEstatus",
        element: <ModificarEstatus></ModificarEstatus>,
      },
    ],
  },
]);

//Router provider para el funcionamiento de rutas
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

initThemeMode();
