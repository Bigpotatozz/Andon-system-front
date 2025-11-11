import {
  Calendar,
  ChartArea,
  Columns3Cog,
  Dice1,
  Dice6,
  Home,
  Search,
  Settings,
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

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },

  {
    title: "Configurar lineas",
    url: "/configuracionLineas",
    icon: Columns3Cog,
  },
  {
    title: "Tablero general",
    url: "/tableroGeneral",
    icon: Dice6,
  },
  {
    title: "Tablero de linea",
    url: "/tableroLinea/:idLinea",
    icon: Dice1,
  },
  {
    title: "Analisis",
    url: "/analisis",
    icon: ChartArea,
  },
];

export function AppSidebar() {
  const navegacion = useNavigate();
  const onClickLinea = (idLinea: string) => {
    navegacion(`/tableroLinea/${idLinea}`);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.title == "Tablero de linea") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          onClick={() => {
                            const idLinea = prompt("ID DE LA LINEA:");

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
