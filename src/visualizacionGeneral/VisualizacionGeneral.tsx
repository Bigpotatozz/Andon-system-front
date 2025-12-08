import { useEffect, useRef, useState } from "react";
import { Plan } from "./components/Plan";
import PlanSquare from "./components/PlanSquare";
import { HeaderTurno } from "@/components/myComponents/HeaderTurno";
import { socket } from "@/sockets/socket";
import dayjs from "dayjs";
import axios from "axios";

const VisualizacionGeneral = () => {
  const [turno, setTurno] = useState(null);
  const [turnoNombre, setTurnoNombre] = useState("");
  const [estatus, setEstatus] = useState(null);
  const [color, setColor] = useState("");

  const [planHora, setPlanHora] = useState(0);
  const [cicleTime, setCicleTime] = useState(0);
  const [planAcumulado, setPlanAcumulado] = useState(0);
  const [realAcumulado, setRealAcumulado] = useState(0);
  const [realHora, setRealHora] = useState(0);
  const [contador, setContador] = useState(0);
  const [horaInicio, setHoraInicio] = useState("");

  const convertirTime = (time: string, planHora: number) => {
    const ahora = new Date();
    const [horas, minutos, segundos] = time.split(":").map(Number);

    const turnoInicioCompleto = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      horas,
      minutos,
      segundos,
    );

    const horasTranscurridas =
      (ahora.getTime() - turnoInicioCompleto.getTime()) / (1000 * 60 * 60);

    console.log(horasTranscurridas);
  };

  const resetearProgresoHora = async () => {
    const response = await axios.put(
      `http://localhost:3000/api/turno/resetearProgresoProduccionHora/${turno.idTurno}`,
    );

    console.log(response);
  };

  useEffect(() => {
    socket.off("obtenerTurno");
    socket.on("obtenerTurno", (data) => {
      console.log(data[0]);
      setTurno(data[0]);
      setTurnoNombre(data[0].nombreTurno);
      setPlanHora(data[0].objetivoProduccionHora);
      setRealHora(data[0].progresoProduccionHora);
      setPlanAcumulado(data[0].objetivoProduccion);
      setRealAcumulado(data[0].progresoProduccion);

      setHoraInicio(data[0].horaInicio);

      setCicleTime(Math.round(3600 / data[0].objetivoProduccion));

      convertirTime(data[0].horaInicio, data[0].objetivoProduccion);
    });

    socket.emit("obtenerTurno");
    return () => {
      socket.off("obtenerTurno");
    };
  }, []);

  const proximaMarcaRef = useRef(null);

  useEffect(() => {
    //Si la hora de inicio es null retorna
    if (!horaInicio) return;

    // Usamos el state hora inicio y lo dividimos en horas minutos y segundos
    const [horas, minutos, segundos] = horaInicio.split(":").map(Number);
    //Creamos una nueva fecha de tipo dayjs con los datos extraidos de horaInicio
    const inicioTurno = dayjs()
      .hour(horas)
      .minute(minutos)
      .second(segundos || 0);

    //Accedemos a la hora y fecha actual
    const ahora = dayjs();

    //Calculamos la diferencia de minutos que han pasado desde la hora de inicio y la actual
    const minutosPasados = ahora.diff(inicioTurno, "minute");
    //Agarramos los minutos que pasaron y los dividmos entre 60 para sacar las horas
    const bloquesCompletos = Math.floor(minutosPasados / 60);

    // agarra los bloques completos (horas) le suma 1 y luego lo pasa a minutos, para sacar la siguiente hora
    proximaMarcaRef.current = inicioTurno.add(
      (bloquesCompletos + 1) * 60,
      "minute",
    );

    //Parsea los minutos a formato de hora
    console.log(
      `Próxima marca inicial: ${proximaMarcaRef.current.format("HH:mm:ss")}`,
    );

    const verificarMarcaHora = () => {
      //Si no existe una proxima marca retorna
      if (!proximaMarcaRef.current) return;

      //Obtiene la hora actual
      const ahoraActual = dayjs();

      //Imprime la hora actual
      console.log(`Hora actual: ${ahoraActual.format("HH:mm:ss")}`);

      // si la hora actual es mayor o igual a la marca que ya esta
      if (ahoraActual.valueOf() >= proximaMarcaRef.current.valueOf()) {
        //Imprime que ya paso la hora
        console.log("⏰ ¡Pasaron 60 minutos! Reiniciando contador");
        //Reinicia el contador
        setRealHora(0);
        resetearProgresoHora();

        // A la marca le agrega 60 minutos para establecer la siguiente
        proximaMarcaRef.current = proximaMarcaRef.current.add(60, "minute");
        console.log(
          `Nueva marca: ${proximaMarcaRef.current.format("HH:mm:ss")}`,
        );
      }
    };

    // Ejecutar inmediatamente
    verificarMarcaHora();

    // Interval cada minuto
    const interval = setInterval(verificarMarcaHora, 60000);

    return () => clearInterval(interval);
  }, [horaInicio]);

  return (
    <div>
      <HeaderTurno turno={turnoNombre}></HeaderTurno>

      <div className="flex justify-center">
        <Plan
          texto1="PLAN"
          texto2="HORA"
          contador={`${planHora}`}
          color="#FFFFFF"
        ></Plan>
        <Plan
          texto1="PLAN"
          texto2="ACUMULADO"
          contador={`${planAcumulado}`}
          color="#FFFFFF"
        ></Plan>
      </div>

      <div className="flex justify-center">
        <Plan
          texto1="REAL"
          texto2="HORA"
          contador={`${realHora}`}
          color="#FFFFFF"
        ></Plan>
        <Plan
          texto1="REAL"
          texto2="ACUMULADO"
          contador={`${realAcumulado}`}
          color="#FFFFFF"
        ></Plan>
      </div>

      <div className="flex justify-center">
        <Plan
          texto1="OEE"
          texto2="HORA"
          contador={`000.0%`}
          color="#FF0000"
        ></Plan>
        <Plan
          texto1="OEE"
          texto2="ACUMULADO"
          contador={`000.0%`}
          color="#FF0000"
        ></Plan>
      </div>

      <div className="flex flex-wrap justify-center">
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
        <PlanSquare numero={"00.00"} color="#49FF00"></PlanSquare>
      </div>

      <div
        className="m-2 rounded-2xl border border-white p-5"
        style={{ background: color }}
      >
        <h2 className="flex justify-center p-5 text-5xl font-bold text-white">
          {estatus}
        </h2>
      </div>
    </div>
  );
};

export default VisualizacionGeneral;
