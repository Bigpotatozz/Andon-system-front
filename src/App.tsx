import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export default function App() {
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
