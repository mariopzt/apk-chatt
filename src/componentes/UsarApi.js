import { useState } from "react";

export function UsarApi() {
  const [consulta, setConsulta] = useState(true);
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [mensjBienvenido, setMensjBienvenido] = useState(true);

  const sendMessage = async ({
    mensajeEnviado,
    mensajeTotal,
    agregarTotalMjs,
    cargarEstadoCarga,
    agregarTextoEscribiendoIa,
  }) => {
    if (!mensajeEnviado.trim() || !consulta) return;
    setConsulta(false);
    setMensjBienvenido(false);
    const newMessages = {
      role: "user",
      content: mensajeEnviado,
    };
    const mensjActualizados = [...mensajeTotal, newMessages];
    agregarTotalMjs(mensjActualizados);
    setMensajeEnviado("");
    cargarEstadoCarga(true);

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
      //mandar la funcion
      agregarTextoEscribiendoIa(respuestaIa);
    } catch (error) {
      console.error("Error al contactar con la API:", error);
    } finally {
      cargarEstadoCarga(false);
    }
  };
}

export default UsarApi;
