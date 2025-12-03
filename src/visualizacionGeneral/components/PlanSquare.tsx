type PlanSquareProps = {
  numero: string;
  color: string;
};

const PlanSquare = ({ numero, color }: PlanSquareProps) => {
  return (
    <div
      className="m-2 flex items-center rounded-2xl border border-white p-6"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-5xl font-bold" style={{ color: color }}>
        {numero}
      </h1>
    </div>
  );
};

export default PlanSquare;
