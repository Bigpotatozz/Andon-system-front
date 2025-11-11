import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

//MODULO AUN EN DESARROLLO Y PENDIENDE E APROBACION
const LineChartComponent = () => {
  // Datos de ejemplo
  const data = [
    {
      fecha: "01/11/2025",
      produccion: 450,
      paros: 45,
      eficiencia: 91,
    },
    {
      fecha: "02/11/2025",
      produccion: 520,
      paros: 30,
      eficiencia: 95,
    },
    {
      fecha: "03/11/2025",
      produccion: 380,
      paros: 85,
      eficiencia: 82,
    },
    {
      fecha: "04/11/2025",
      produccion: 490,
      paros: 50,
      eficiencia: 91,
    },
    {
      fecha: "05/11/2025",
      produccion: 510,
      paros: 40,
      eficiencia: 93,
    },
    {
      fecha: "06/11/2025",
      produccion: 470,
      paros: 60,
      eficiencia: 89,
    },
    {
      fecha: "07/11/2025",
      produccion: 530,
      paros: 25,
      eficiencia: 96,
    },
  ];

  /*
  const produccionSemanal = [
    { fecha: "01/11", produccion: 450, paros: 45, eficiencia: 91 },
    { fecha: "02/11", produccion: 520, paros: 30, eficiencia: 95 },
    { fecha: "03/11", produccion: 380, paros: 85, eficiencia: 82 },
    { fecha: "04/11", produccion: 490, paros: 50, eficiencia: 91 },
    { fecha: "05/11", produccion: 510, paros: 40, eficiencia: 93 },
    { fecha: "06/11", produccion: 470, paros: 60, eficiencia: 89 },
    { fecha: "07/11", produccion: 530, paros: 25, eficiencia: 96 },
  ];
  */

  const eficienciaLineas = [
    { linea: "Línea 1", eficiencia: 92, meta: 90 },
    { linea: "Línea 2", eficiencia: 88, meta: 90 },
    { linea: "Línea 3", eficiencia: 95, meta: 90 },
    { linea: "Línea 4", eficiencia: 78, meta: 90 },
    { linea: "Línea 5", eficiencia: 91, meta: 90 },
  ];

  const estadoLineas = [
    { linea: "Línea 1", tiempo: 180, estado: "Produciendo", color: "#10b981" },
    { linea: "Línea 2", tiempo: 45, estado: "Mantenimiento", color: "#f59e0b" },
    { linea: "Línea 3", tiempo: 220, estado: "Produciendo", color: "#10b981" },
    { linea: "Línea 4", tiempo: 15, estado: "Paro", color: "#ef4444" },
    { linea: "Línea 5", tiempo: 160, estado: "Produciendo", color: "#10b981" },
  ];

  /*
  const kpiRadar = [
    { kpi: "OEE", value: 85, fullMark: 100 },
    { kpi: "Calidad", value: 92, fullMark: 100 },
    { kpi: "Disponibilidad", value: 88, fullMark: 100 },
    { kpi: "Rendimiento", value: 90, fullMark: 100 },
    { kpi: "Eficiencia", value: 87, fullMark: 100 },
  ];
*/
  const tiposParos = [
    { nombre: "Mantenimiento", valor: 120, color: "#f59e0b" },
    { nombre: "Falta de Material", valor: 85, color: "#ef4444" },
    { nombre: "Cambio de Formato", valor: 65, color: "#3b82f6" },
    { nombre: "Falla Eléctrica", valor: 45, color: "#8b5cf6" },
    { nombre: "Otros", valor: 30, color: "#6b7280" },
  ];

  return (
    <div className="bg-dark p-10 text-center">
      <h1 className="p-3">
        <strong className="text-white">Estado de la linea de produccion</strong>
      </h1>
      {/*GRAFICA QUE INDICA LA EFICIENCIA, LOS PAROS DE TIPO ROJO Y LAS UNIDADES PRODUCIDAS*/}
      <div className="md-4xl mx-auto rounded-lg p-6 shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffffff" />
            <XAxis
              dataKey="fecha"
              stroke="#ffffffff"
              style={{ fontSize: 12 }}
            />
            <YAxis stroke="#ffffffff" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            <Line
              type="monotone"
              dataKey="produccion"
              stroke="#10b981"
              strokeWidth={3}
              name="Producción (unidades)"
              dot={{ fill: "#10b981", r: 5 }}
              activeDot={{ r: 8 }}
            />

            <Line
              type="monotone"
              dataKey="paros"
              stroke="#ef4444"
              strokeWidth={3}
              name="Paros (minutos)"
              dot={{ fill: "#ef4444", r: 5 }}
              activeDot={{ r: 8 }}
            />

            <Line
              type="monotone"
              dataKey="eficiencia"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Eficiencia (%)"
              dot={{ fill: "#3b82f6", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-600">
              Producción Promedio
            </p>
            <p className="text-2xl font-bold text-green-700">480 unidades</p>
          </div>
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-600">Paros Promedio</p>
            <p className="text-2xl font-bold text-red-700">48 minutos</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-600">
              Eficiencia Promedio
            </p>
            <p className="text-2xl font-bold text-blue-700">91%</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/*GRAFICA QUE INDICA LOS TIPOS DE PAROS QUE SE HICIERON POR ESTATUS*/}
        <div className="bg-dark rounded-lg p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Tipos de Paros por estatus
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tiposParos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {tiposParos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Eficiencia por Línea vs Meta
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eficienciaLineas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="linea" stroke="#ffffffff" />
              <YAxis stroke="#ffffffff" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="eficiencia"
                fill="#3b82f6"
                name="Eficiencia Actual (%)"
              />
              <Bar dataKey="meta" fill="#d1d5db" name="Meta (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRAFICA CON EL ESTADO ACTUAL DE LAS LINEAS */}
      <div className="bg-dark mb-6 rounded-lg p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Estado Actual de Líneas (Minutos en Estado)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={estadoLineas} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#ffffffff" />
            <YAxis type="category" dataKey="linea" stroke="#ffffffff" />
            <Tooltip />
            <Bar dataKey="tiempo" name="Minutos en Estado">
              {estadoLineas.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
