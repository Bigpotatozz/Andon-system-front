import {
  Bolt,
  ChartArea,
  Columns3Cog,
  Dice6,
  Edit,
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
import { useNavigate } from "react-router";
import axios from "axios";
import { title } from "process";
import { url } from "inspector";

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
  {
    title: "Modificar estatus",
    url: "/modificarEstatus",
    icon: Edit,
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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
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
