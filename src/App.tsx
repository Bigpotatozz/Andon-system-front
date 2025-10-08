import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <div className="dark">
        <div className="bg-primary dark:bg-primary-dark">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
