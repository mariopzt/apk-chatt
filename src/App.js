import React, { useState } from "react";
import { CircleUserRound } from "lucide-react";

import { BotMessageSquare } from "lucide-react";
function App() {
  const [mensajeTotal, setMensajeTotal] = useState([
    {
      role: "assistant",
      content: "Hola soy tu IA",
    },
  ]);
  const [mensajeEnviado, setMensajeEnviado] = useState("");

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

  return (
    <div className="padre">
      <div
        className="chat"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mensajeTotal.map((mensaje, index) => {
          return (
            <div
              style={{
                marginBottom: "10px",
                minHeight: "20px",
                paddingLeft: "10px",
                marginLeft: "10px",
                borderRadius: "10px",
                display: "flex",
                padding: "10px",
                color: "white",
                width: "fit-content",
                maxWidth: "80%",
              }}
              key={index}
            >
              <div style={{ display: "flex", alignItems: "start" }}>
                {mensaje.role == "assistant" ? (
                  <BotMessageSquare
                    size={30}
                    color="red"
                    style={{
                      paddingRight: "5px",
                      flexShrink: 0,
                      paddingTop: "0",
                    }}
                  />
                ) : (
                  <CircleUserRound
                    size={30}
                    color="red"
                    style={{
                      flexShrink: 0,
                      paddingRight: "5px",
                      paddingTop: "0",
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  color: "black",
                }}
              >
                {mensaje.content}
              </div>
            </div>
          );
        })}
        <div
          style={{
            width: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            placeholder="What do you want to say?"
            value={mensajeEnviado}
            onChange={(e) => {
              setMensajeEnviado(e.target.value);
            }}
            style={{ width: "100%", height: "20px", borderRadius: "4px" }}
          ></input>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
