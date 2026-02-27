import { RankingParoLinea } from "./components/RankingParoLinea.tsx";
import { RankingParoEstacion } from "./components/RankingParoEstacion.tsx";

const Analisis = () => {
  return (
    <div className="bg-dark min-h-screen">
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-6">
          <section className="col-span-1">
            <RankingParoLinea />
          </section>
          <section className="col-span-1">
            <RankingParoEstacion />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Analisis;
