import { CircleFadingArrowUp } from "lucide-react";
import { CircleSlash2 } from "lucide-react";
import { Biohazard } from "lucide-react";
import icono from "../componentes/iconnos/icon.png";

import { useEffect } from "react";
import { Menu } from "./Menu";

import "../App.css";
export function RenderisadoIa({
  mensajeTotal,
  setMensajeTotal,
  mensjEscribiendolo,
  preguntasEchas,
  mensjBienvenido,
  setDispararPregunta,
  setMensajeEnviado,
  cargando,
  textareaRef,
  mensajeEnviado,
  handleSendMessage,
  setMensjBienvenido,
  endChat,
  dispararPregunta,
  cancelarActividad,
  setCancelarActividad,
  array_Padre,
  setArray_Padre,
}) {
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

  useEffect(() => {
    if (mensajeEnviado) {
      setDispararPregunta(false);
      handleSendMessage();
    }
  }, [dispararPregunta]);
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
  return (
    <div className="padre">
      <Menu
        array_Padre={array_Padre}
        mensajeTotal={mensajeTotal}
        setArray_Padre={setArray_Padre}
        setMensajeTotal={setMensajeTotal}
        setMensjBienvenido={setMensjBienvenido}
        mensjBienvenido={mensjBienvenido}
        setCancelarActividad={setCancelarActividad}
        cancelarActividad={cancelarActividad}
      />
      <div className="PadreDelHijo">
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
              <div className="bienvenidaTexto">
                Hey there! I'm GPT-3.5 — here to assist you with whatever you
                need. Let’s get started!
              </div>
              <div className="preguntasAutoF">Frequently Asked Questions</div>
              <div className="preguntasPadreP">
                <div
                  onClick={(e) =>
                    preguntasEchas(e, setDispararPregunta, setMensajeEnviado)
                  }
                  className="preguntas "
                >
                  <strong>What are algorithms?</strong>
                  <p>
                    Algorithms are step-by-step instructions used to solve
                    problems or perform tasks in programming.
                  </p>
                </div>
                <div
                  onClick={(e) =>
                    preguntasEchas(e, setDispararPregunta, setMensajeEnviado)
                  }
                  className="preguntas "
                >
                  <strong>What is web development?</strong>
                  <p>
                    Building and managing websites, including layout, content,
                    and functionality.
                  </p>
                </div>
                <div
                  onClick={(e) =>
                    preguntasEchas(e, setDispararPregunta, setMensajeEnviado)
                  }
                  className="preguntas "
                >
                  <strong>AI (Artificial Intelligence)</strong>
                  <p>
                    Smart tech that learns, improves, and helps with human-like
                    tasks.
                  </p>
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
          <img className="iconoIa" src={icono} alt="icono"></img>
          <div className="envio">
            <textarea
              ref={textareaRef}
              placeholder="write anityng...?"
              rows="1"
              value={mensajeEnviado}
              disabled={!cancelarActividad}
              onChange={(e) => setMensajeEnviado(e.target.value)}
              className="inputEnviar"
            ></textarea>
            <button
              className="boton"
              onClick={handleSendMessage}
              disabled={!cancelarActividad}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderisadoIa;
