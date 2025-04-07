import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { sendMessageToApi } from "./UsarApi";
import { CircleFadingArrowUp } from "lucide-react";
import { CircleSlash2 } from "lucide-react";

function Padre() {
  const [mensajeTotal, setMensajeTotal] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensjEscribiendolo, setMensjEscribiendolo] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [consulta, setConsulta] = useState(true);
  const [mensjBienvenido, setMensjBienvenido] = useState(true);
  const endChat = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (endChat.current) {
      setTimeout(() => {
        endChat.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 10);
    }
  }, [mensajeTotal, mensjEscribiendolo, cargando]);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSendMessage();
        event.preventDefault();
      }
    };

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [mensajeEnviado]);

  const agregarTextoEscribiendoIa = (respuestaIa) => {
    let i = 0;

    setMensjEscribiendolo("");

    const interval = setInterval(() => {
      if (i < respuestaIa.length) {
        setMensjEscribiendolo((prev) => prev + respuestaIa[i - 1]);
        i++;
      } else {
        clearInterval(interval);

        setMensajeTotal((valorAnterior) => [
          ...valorAnterior,
          { role: "assistant", content: respuestaIa || "Sin respuesta." },
        ]);
        setConsulta(true);
        setMensjEscribiendolo("");
      }
    }, 5);
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
      agregarTextoEscribiendoIa,
      consulta,
    });
  };

  return (
    <div className="padre">
      <div className="hijoPadre">
        {mensajeTotal.map((mensaje, index) => {
          const esUltimoMensaje = index === mensajeTotal.length - 1;
          const esAsistente = mensaje.role === "assistant";

          return (
            <div
              className={`${
                mensaje.role === "assistant" ? "asistente" : "usuario"
              } mensjPadre`}
              key={index}
            >
              <div
                className={`${mensaje.role === "assistant" ? "IA" : "User"}`}
              >
                {esAsistente
                  ? esUltimoMensaje && mensjEscribiendolo !== ""
                    ? mensjEscribiendolo
                    : mensaje.content
                  : mensaje.content}
              </div>
            </div>
          );
        })}

        {mensjBienvenido && (
          <div className="bienvenida">
            ¡Bienvenido a GPT, donde estoy aquí para ayudarte con lo que
            necesites en una sola línea!
            <div className="preguntasPadreP">
              <div className="preguntas">
                <strong>¿Programacion?</strong>
                <p>es sobre la programadcion lo q nesecito</p>
              </div>
              <div className="preguntas">
                {" "}
                <strong>¿Dietas?</strong>
                <p>es sobre la programadcion lo q nesecito</p>
              </div>
              <div className="preguntas">
                {" "}
                <strong>¿Paises?</strong>
                <p>es sobre la programadcion lo q nesecito</p>
              </div>
            </div>
          </div>
        )}
        {cargando && (
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        {mensjEscribiendolo && (
          <div className="asistente mensjPadre escribiendo">
            <div className="IA">{mensjEscribiendolo}</div>
          </div>
        )}
        <div ref={endChat} />
      </div>

      <div className="botonEnviar">
        <div className="envio">
          <textarea
            ref={textareaRef}
            placeholder="What do you want to say?"
            value={mensajeEnviado}
            disabled={cargando}
            onChange={(e) => setMensajeEnviado(e.target.value)}
            className="inputEnviar"
          ></textarea>
          <button
            className="boton"
            onClick={handleSendMessage}
            disabled={cargando}
          >
            {cargando ? (
              <CircleSlash2 className="botonP" color="#9b9a9a" />
            ) : (
              <CircleFadingArrowUp className="botonP" color="#9b9a9a" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Padre;
