import {
  Bolt,
  ChartArea,
  Columns3Cog,
  Dice6,
  FileSliders,
  Home,
  LayoutDashboard,
  Table,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router";
import axios from "axios";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },

  {
    title: "Configurar estaciones",
    url: "/configuracionLineas",
    icon: Columns3Cog,
  },

  {
    title: "Production ratio",
    url: "/productionRatio",
    icon: Bolt,
  },

  {
    title: "Tablero general",
    url: "/tableroGeneral",
    icon: Dice6,
  },

  {
    title: "Visualización general",
    url: "/visualizacionGeneral",
    icon: LayoutDashboard,
  },

  {
    title: "Reportes",
    url: "/tablaGeneral",
    icon: Table,
  },
  {
    title: "Analisis",
    url: "/analisis",
    icon: ChartArea,
  },

  /*
  {
    title: "Modificar estatus",
    url: "/modificarEstatus",
    icon: Edit,
  },

  */

  /*
  {
    title: "Configuracion de turnos",
    url: "/configuracionTurno",
    icon: Edit,
  },
  */

  {
    title: "Configurar PLC",
    url: "/configuracionPLC",
    icon: FileSliders,
  },
];

export function AppSidebar() {
  const navegacion = useNavigate();
  const onClickLinea = async (idLinea: string) => {
    try {
      if (parseInt(idLinea) <= 0 || isNaN(parseInt(idLinea))) {
        alert("Debes introducir un ID valido");
        return;
      }
      const response = await verificarLinea(idLinea);
      if (!response.linea) {
        alert("La linea de produccion indicada no existe");
        return;
      }
      navegacion(`/tableroLinea/${idLinea}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al verificar la línea");
    }
  };

  const verificarLinea = async (id: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/linea/verificarExistenciaLinea/${id}`,
    );

    console.log(response);
    return response.data;
  };

  const onClickConSeleccionDeLinea = async (baseUrl: string) => {
    try {
      const res = await axios.get("http://localhost:3000/api/linea/");
      const lineas = res.data.lineas;
      if (!lineas || lineas.length === 0) {
        alert("No hay líneas registradas");
        return;
      }

      let mensaje = "Selecciona el ID de la línea:\n\n";
      lineas.forEach((l: any) => {
        mensaje += `${l.idLineaProduccion}: ${l.nombre}\n`;
      });

      const idSeleccionado = prompt(mensaje);
      
      if (!idSeleccionado) return;

      const existe = lineas.find((l: any) => l.idLineaProduccion.toString() === idSeleccionado);
      if (!existe) {
        alert("ID inválido o línea no existe");
        return;
      }

      navegacion(`${baseUrl}/${idSeleccionado}`);
    } catch (e) {
      console.error(e);
      alert("Error al cargar líneas");
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Okaya México</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.title == "Tablero de estacion") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          onClick={() => {
                            const idLinea = prompt("ID DE LA ESTACION:");

                            //Validacion isNotEmpty
                            if (idLinea == "" || idLinea == null) {
                              alert("Debes introducir un ID");
                              return;
                            }
                            //Invocacion de la funcion
                            onClickLinea(idLinea);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                } else if (item.title === "Configurar estaciones") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          onClick={() => {
                            const password = prompt(
                              "Ingrese la contraseña para configurar estaciones:",
                            );
                            if (password === "admin123") {
                              navegacion(item.url);
                            } else if (password !== null) {
                              alert("Contraseña incorrecta");
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                } else if (item.title === "Production ratio" || item.title === "Visualización general") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          onClick={() => onClickConSeleccionDeLinea(item.url)}
                          style={{ cursor: "pointer" }}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                } else {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
