export const sendMessageToApi = async ({
  mensajeEnviado,
  setMensajeTotal,
  setMensajeEnviado,
  setCargando,
  setConsulta,
  setMensjBienvenido,
  mensjBienvenido,
  mensajeTotal,
  textoEscritoAnimado,
  consulta,
}) => {
  if (!mensajeEnviado.trim() || !consulta) return;
  setConsulta(false);
  setMensjBienvenido(() => {
    const nuevoValor = false;
    localStorage.setItem("valorBienvenido", JSON.stringify(nuevoValor));
    return nuevoValor;
  });

  console.log(mensjBienvenido);

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
    const respuestaIa = data.choices?.[0]?.message?.content || "Sin respuesta.";
    textoEscritoAnimado(respuestaIa);
  } catch (error) {
    console.error("Error al contactar con la API:", error);
  } finally {
    setCargando(false);
  }
};
