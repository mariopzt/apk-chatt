import React, { useState, useEffect, useRef } from "react";
import { agregarTextoEscribiendoIa } from "../componentes/AgregarAnimacionEscribir";
import { preguntasEchas } from "../componentes/funciones";
import "../App.css";
import { sendMessageToApi } from "./UsarApi";
import { CircleFadingArrowUp } from "lucide-react";
import { CircleSlash2 } from "lucide-react";
import { Biohazard } from "lucide-react";
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
            <Biohazard
              style={{ marginBottom: "20px" }}
              color="#9b9a9a"
              size={122}
            />
            <div>
              ¡Bienvenido a GPT, donde estoy aquí para ayudarte con lo que
              necesites en una sola línea!
            </div>
            <div className="preguntasPadreP">
              <div
                onClick={(e) =>
                  preguntasEchas(e, setDispararPregunta, setMensajeEnviado)
                }
                className="preguntas "
              >
                <strong>Algoritmos?</strong>
                <p>Pasos para resolver problemas en programación.</p>
              </div>
              <div
                onClick={(e) =>
                  preguntasEchas(e, setDispararPregunta, setMensajeEnviado)
                }
                className="preguntas "
              >
                <strong>Algoritmos?</strong>
                <p>Estudio de alimentos y nutrientes para la salud.</p>
              </div>
              <div
                onClick={(e) =>
                  preguntasEchas(e, setDispararPregunta, setMensajeEnviado)
                }
                className="preguntas "
              >
                <strong>Desarrollo web?</strong>
                <p>Creación y mantenimiento de sitios en línea.</p>
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
