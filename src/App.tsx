import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <div className="dark h-full w-full">
        <div className="bg-primary dark:bg-primary-dark min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
