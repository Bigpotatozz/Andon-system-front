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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

initThemeMode();
