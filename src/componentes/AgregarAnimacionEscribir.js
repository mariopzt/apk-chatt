export const agregarTextoEscribiendoIa = ({
  respuestaIa,
  setMensjEscribiendolo,
  setMensajeTotal,
  setConsulta,
  mensajeTotal,
}) => {
  let i = 0;

  setMensjEscribiendolo(""); // Limpiamos el texto animado al inicio

  const interval = setInterval(() => {
    if (i < respuestaIa.length) {
      setMensjEscribiendolo((prev) => prev + respuestaIa[i]); // Corregido: `i - 1` a `i`
      i++;
    } else {
      clearInterval(interval); // Terminamos la animación

      // Actualizamos el mensaje total con el mensaje completo
      setMensajeTotal((valorAnterior) => {
        const nuevo = [
          ...valorAnterior,
          { role: "assistant", content: respuestaIa || "Sin respuesta." },
        ];

        // Guardamos el estado actualizado en localStorage
        localStorage.setItem("mensajesGuardados", JSON.stringify(nuevo));

        setConsulta(true); // Indicamos que ya terminó la animación
        setMensjEscribiendolo(""); // Limpiamos el texto de "escribiendo"

        return nuevo; // Retornamos el nuevo estado
      });
    }
  }, 6); // Retraso de 50 ms entre cada letra (puedes ajustarlo si quieres que sea más rápido o lento)
};
