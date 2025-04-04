import React, { useState } from "react";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "org-wwjal4HYchDsZyDGnCrqzAi1"; // ⚠️ No compartas esto públicamente

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`, // Aquí va tu API KEY secreta
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...newChat],
          }),
        }
      );

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setChat([...newChat, { role: "assistant", content: reply }]);
      setInput("");
    } catch (error) {
      console.error("Error al contactar con la API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>🤖 Chat con GPT</h2>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {chat.map((msg, idx) => (
          <p
            key={idx}
            style={{ color: msg.role === "user" ? "blue" : "green" }}
          >
            <strong>{msg.role === "user" ? "Tú" : "Bot"}:</strong> {msg.content}
          </p>
        ))}
        {loading && (
          <p>
            <em>Escribiendo...</em>
          </p>
        )}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        style={{ width: "80%", padding: "8px", marginTop: "10px" }}
      />
      <button
        onClick={sendMessage}
        style={{ padding: "8px", marginLeft: "10px" }}
      >
        Enviar
      </button>
    </div>
  );
};

export default App;
