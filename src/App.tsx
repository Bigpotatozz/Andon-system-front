import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { useEffect } from "react";
import { socket } from "./sockets/socket";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");

    document.documentElement.style.colorScheme = "dark";

    socket.connect();
  }, []);

  return (
    <div className="dark w-full">
      <div className="min-h-screen bg-gray-950 text-gray-50">
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <main className="flex-1 bg-gray-950 p-4">
            <SidebarTrigger className="text-white" />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
