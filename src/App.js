import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { CircleFadingArrowUp } from "lucide-react";

function App() {
  const [mensajeTotal, setMensajeTotal] = useState([
    {
      role: "assistant",
      content: "Hola soy tu IA",
    },
  ]);
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const endChat = useRef(null);

  useEffect(() => {
    endChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajeTotal]);

  const sendMessage = async () => {
    if (!mensajeEnviado.trim()) return;

    const newMessages = {
      role: "user",
      content: mensajeEnviado,
    };
    const mensjActualizados = [...mensajeTotal, newMessages];
    setMensajeTotal(mensjActualizados);
    setMensajeEnviado("");

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
    } catch (error) {
      console.error("Error al contactar con la API:", error);
    }
  };
  window.addEventListener((event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

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
                <div style={{}}>{mensaje.content}</div>
              </div>
            </div>
          );
        })}
        <div ref={endChat} />
        <div className="botonEnviar">
          <input
            placeholder="What do you want to say?"
            value={mensajeEnviado}
            onChange={(e) => {
              setMensajeEnviado(e.target.value);
            }}
            className="inputEnviar"
          ></input>
          <button className="boton" onClick={sendMessage}>
            <CircleFadingArrowUp color="#9b9a9a"></CircleFadingArrowUp>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
