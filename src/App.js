import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { CircleFadingArrowUp } from "lucide-react";

function App() {
  const [mensajeTotal, setMensajeTotal] = useState([]);
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [mensjBienvenido, setMensjBienvenido] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [mensjEscribiendolo, setMensjEscribiendolo] = useState("");
  const endChat = useRef(null);
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
  }, [mensajeTotal]);

  // const agregarTextoEscribiendoIa = (respuestaIa) => {
  //   let i = 0;
  // //  setMensjEscribiendolo("");
  //   const interval = setInterval(() => {
  //     if (i < respuestaIa.length) {
  //       setMensjEscribiendolo((prev) => prev + respuestaIa[i]);
  //       i++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 30);
  // };

  const sendMessage = async () => {
    if (!mensajeEnviado.trim()) return;
    setMensjBienvenido(false);
    const newMessages = {
      role: "user",
      content: mensajeEnviado,
    };
    const mensjActualizados = [...mensajeTotal, newMessages];
    setMensajeTotal(mensjActualizados);
    setMensajeEnviado("");
    setCargando(true);

    const key =
      "Bearer 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";

    try {
      const respuesta = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: mensjActualizados,
          }),
        }
      );

      const data = await respuesta.json();
      const respuestaIa =
        data.choices?.[0]?.message?.content || "Sin respuesta.";
      setMensajeTotal((valorAnterior) => [
        ...valorAnterior,
        { role: "assistant", content: respuestaIa },
      ]);
      //agregarTextoEscribiendoIa(respuestaIa);
    } catch (error) {
      console.error("Error al contactar con la API:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="padre">
      <div className="hijoPadre">
        {mensajeTotal.map((mensaje, index) => {
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
                {mensaje.role === "assistant" ? (
                  <div className="usuarioTexto">{mensaje.content}</div>
                ) : (
                  <div className="usuarioTexto">{mensaje.content}</div>
                )}
              </div>
            </div>
          );
        })}

        {cargando && (
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        {mensjBienvenido && (
          <div className="bienvenida">
            ¡Bienvenido a GPT, donde estoy aquí para ayudarte con lo que
            necesites en una sola línea!
          </div>
        )}
        <div ref={endChat} />
      </div>

      <div className="botonEnviar">
        <textarea
          ref={textareaRef}
          placeholder="What do you want to say?"
          value={mensajeEnviado}
          onChange={(e) => {
            setMensajeEnviado(e.target.value);
          }}
          className="inputEnviar"
        ></textarea>
        <button className="boton" onClick={sendMessage}>
          <CircleFadingArrowUp
            className="botonP"
            color="#9b9a9a"
          ></CircleFadingArrowUp>
        </button>
      </div>
    </div>
  );
}

export default App;
