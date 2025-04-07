export const agregarTextoEscribiendoIa = ({
  respuestaIa,
  setMensjEscribiendolo,
  setMensajeTotal,
  setConsulta,
}) => {
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
