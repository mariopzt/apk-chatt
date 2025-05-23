import React, { useState, useRef, useEffect } from "react";
import { agregarTextoEscribiendoIa } from "../componentes/AgregarAnimacionEscribir";
import { preguntasEchas } from "../componentes/funciones";
import "../App.css";
import { sendMessageToApi } from "./UsarApi";
import { RenderisadoIa } from "./RenderisadoIa";

function Padre() {
  const [mensajeTotal, setMensajeTotal] = useState(() => {
    const mensajesGuardados = localStorage.getItem("mensajesGuardados");
    return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
  });
  const [array_Padre, setArray_Padre] = useState(() => {
    const mensajesGuardados = localStorage.getItem("padreArray");
    return mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
  });

  const [cargando, setCargando] = useState(false);
  const [mensjEscribiendolo, setMensjEscribiendolo] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [consulta, setConsulta] = useState(true);
  const [mensjBienvenido, setMensjBienvenido] = useState(() => {
    const mensajesGuardados = localStorage.getItem("valorBienvenido");
    return mensajesGuardados ? JSON.parse(mensajesGuardados) : true;
  });
  const [cancelarActividad, setCancelarActividad] = useState(() => {
    const actividad = localStorage.getItem("actividad");
    return actividad ? JSON.parse(actividad) : true;
  });

  const [dispararPregunta, setDispararPregunta] = useState(false);
  const endChat = useRef(null);
  const textareaRef = useRef(null);

  const textoEscritoAnimado = (respuestaIa) => {
    agregarTextoEscribiendoIa({
      setMensjEscribiendolo,

      setMensajeTotal,
      setMensjBienvenido,
      mensjBienvenido,
      setCargando,
      mensajeTotal,
      cancelarActividad,
      setCancelarActividad,
      respuestaIa,
      setMensajeTotal,
      setConsulta,
    });
  };

  const handleSendMessage = () => {
    sendMessageToApi({
      cancelarActividad,
      mensajeEnviado,
      setMensajeTotal,
      setMensajeEnviado,
      setCargando,
      setConsulta,
      mensjBienvenido,
      setMensjBienvenido,
      mensajeTotal,
      textoEscritoAnimado,
      consulta,
      setCancelarActividad,
    });
  };

  return (
    <>
      <RenderisadoIa
        mensajeTotal={mensajeTotal}
        mensjEscribiendolo={mensjEscribiendolo}
        preguntasEchas={preguntasEchas}
        mensjBienvenido={mensjBienvenido}
        setDispararPregunta={setDispararPregunta}
        setMensajeEnviado={setMensajeEnviado}
        cargando={cargando}
        textareaRef={textareaRef}
        mensajeEnviado={mensajeEnviado}
        handleSendMessage={handleSendMessage}
        endChat={endChat}
        setMensajeTotal={setMensajeTotal}
        dispararPregunta={dispararPregunta}
        setCargando={setCargando}
        setConsulta={setConsulta}
        setMensjBienvenido={setMensjBienvenido}
        setCancelarActividad={setCancelarActividad}
        cancelarActividad={cancelarActividad}
        consulta={consulta}
        array_Padre={array_Padre}
        setArray_Padre={setArray_Padre}
      />
    </>
  );
}

export default Padre;
