import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { CircleFadingArrowUp } from "lucide-react";

function App() {
  const [mensajeTotal, setMensajeTotal] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensjEscribiendolo, setMensjEscribiendolo] = useState("");

  const endChat = useRef(null);

  const agregarTotalMjs = (e) => {
    setMensajeTotal(e);
  };
  const cargarEstadoCarga = (e) => {
    setCargando(e);
  };
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        sendMessage();
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
    if (endChat.current) {
      endChat.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajeTotal, mensjEscribiendolo]);

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
                className={`${mensaje.role === "assistant" ? "IA" : "User"} `}
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
          </div>
        )}
        {mensjEscribiendolo && (
          <div className="asistente mensjPadre escribiendo">
            <div className="IA">{mensjEscribiendolo}</div>
          </div>
        )}
        <div ref={endChat} />
        {cargando && (
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>

      <div className="botonEnviar">
        <textarea
          ref={textareaRef}
          placeholder="What do you want to say?"
          value={mensajeEnviado}
          disabled={cargando}
          onChange={(e) => {
            setMensajeEnviado(e.target.value);
          }}
          className="inputEnviar"
        ></textarea>
        <button className="boton" onClick={sendMessage} disabled={cargando}>
          <CircleFadingArrowUp className="botonP" color="#9b9a9a" />
        </button>
      </div>
    </div>
  );
}

export default App;
