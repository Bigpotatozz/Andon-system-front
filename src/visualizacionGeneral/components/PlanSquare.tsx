type PlanSquareProps = {
  numero: string;
  color: string;
};

const PlanSquare = ({ numero, color }: PlanSquareProps) => {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl border border-white px-4 py-3 md:px-6 md:py-4">
      <h1
        className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ color: color }}
      >
        {numero}
      </h1>
    </div>
  );
};

export default PlanSquare;
