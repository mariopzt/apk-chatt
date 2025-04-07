import React, { useState, useEffect, useRef } from "react";
import { agregarTextoEscribiendoIa } from "../componentes/AgregarAnimacionEscribir";
import { preguntasEchas } from "../componentes/funciones";
import "../App.css";
import { sendMessageToApi } from "./UsarApi";
import { RenderisadoIa } from "./RenderisadoIa";

function Padre() {
  const [mensajeTotal, setMensajeTotal] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensjEscribiendolo, setMensjEscribiendolo] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [consulta, setConsulta] = useState(true);
  const [mensjBienvenido, setMensjBienvenido] = useState(true);
  const [dispararPregunta, setDispararPregunta] = useState(false);
  const endChat = useRef(null);
  const textareaRef = useRef(null);

  const textoEscritoAnimado = (respuestaIa) => {
    agregarTextoEscribiendoIa({
      respuestaIa,
      setMensjEscribiendolo,
      setMensajeTotal,
      setConsulta,
    });
  };
  const handleSendMessage = () => {
    sendMessageToApi({
      mensajeEnviado,
      setMensajeTotal,
      setMensajeEnviado,
      setCargando,
      setConsulta,
      setMensjBienvenido,
      mensajeTotal,
      textoEscritoAnimado,
      consulta,
    });
  };

  return (
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
    />
  );
}

export default Padre;
