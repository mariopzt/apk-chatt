import React, { useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: newMessages,
          }),
        }
      );

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sin respuesta.";
      console.log(data);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error al contactar con la API:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Ocurrió un error al contactar con la API.",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#111", // Fondo oscuro para el contraste
        fontFamily: "'Poppins', sans-serif", // Fuente moderna
        color: "#f1f1f1", // Color de texto
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#FF5733", // Fondo vibrante
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          animation: "fadeIn 1s ease-out", // Animación de aparición
        }}
      >
        <h2 style={{ fontSize: "20px", margin: 0, color: "white" }}>
          💬 Chat con OpenRouter
        </h2>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#181818", // Fondo oscuro para el chat
          boxSizing: "border-box",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: msg.role === "user" ? "#009688" : "#444", // Color verde para el usuario
              padding: "12px 15px",
              borderRadius: "20px",
              marginBottom: "15px",
              color: "white",
              maxWidth: "80%",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <strong
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "white",
                display: "block",
              }}
            >
              {msg.role === "user" ? "Tú" : "Bot"}:
            </strong>
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div
        style={{
          display: "flex",
          padding: "15px",
          backgroundColor: "#222",
          boxSizing: "border-box",
          borderTop: "1px solid #333",
        }}
      >
        <input
          type="text"
          value={input}
          placeholder="Escribe un mensaje..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: "12px 15px",
            borderRadius: "30px",
            border: "1px solid #444",
            backgroundColor: "#333",
            color: "#f1f1f1",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s ease",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "12px 20px",
            backgroundColor: "#FF5733", // Botón vibrante
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            marginLeft: "10px",
            fontSize: "18px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default App;
