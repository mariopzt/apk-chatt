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
  cancelarActividad,
  setCancelarActividad,
}) => {
  if (!mensajeEnviado.trim() || !consulta) return;
  setCargando(true);
  setConsulta(false);
  setMensjBienvenido(() => {
    const nuevoValor = false;
    localStorage.setItem("valorBienvenido", JSON.stringify(nuevoValor));
    return nuevoValor;
  });
  setCancelarActividad(false);

  localStorage.setItem("actividad", JSON.stringify(cancelarActividad));
  console.log(cancelarActividad);
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
    const respuestaIa = data.choices?.[0]?.message?.content || "Sin respuesta.";

    textoEscritoAnimado(respuestaIa);
  } catch (error) {
    console.error("Error al contactar con la API:", error);
  } finally {
    setCargando(false);
  }
};
