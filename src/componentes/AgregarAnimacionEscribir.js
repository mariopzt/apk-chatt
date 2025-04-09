export const agregarTextoEscribiendoIa = ({
  respuestaIa,
  mensjBienvenido,
  setCancelarActividad,
  setCargando,
  cancelarActividad,
  setMensjEscribiendolo,
  setMensajeTotal,
  setConsulta,
}) => {
  let i = 0;

  setMensjEscribiendolo("");

  const interval = setInterval(() => {
    if (i < respuestaIa.length) {
      setMensjEscribiendolo((prev) => prev + respuestaIa[i - 1]);
      if (mensjBienvenido) {
        clearInterval(interval);
        return;
      }

      i++;
    } else {
      clearInterval(interval);

      setMensajeTotal((valorAnterior) => {
        const nuevo = [
          ...valorAnterior,
          { role: "assistant", content: respuestaIa || "Sin respuesta." },
        ];
        setCargando(false);
        setCancelarActividad(true);

        localStorage.setItem("actividad", JSON.stringify(cancelarActividad));

        localStorage.setItem("mensajesGuardados", JSON.stringify(nuevo));

        setConsulta(true);
        setMensjEscribiendolo("");

        return nuevo;
      });
    }
  }, 6);
};
