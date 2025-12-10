import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { useEffect } from "react";
import { socket } from "./sockets/socket";

export default function App() {
  //En cuanto inicia la aplicacion se conecta a los sockets
  useEffect(() => {
    socket.connect();
  });
  return (
    <div className="w-full">
      <div className="min-h-screen">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
