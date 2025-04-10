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
  setCancelarActividad(false);

  setMensjEscribiendolo("");

  const interval = setInterval(() => {
    if (i < respuestaIa.length) {
      setMensjEscribiendolo((prev) => prev + respuestaIa[i - 1]);
      i++;
    } else {
      clearInterval(interval);

      setMensajeTotal((valorAnterior) => {
        const nuevo = [
          ...valorAnterior,
          { role: "assistant", content: respuestaIa || "Sin respuesta." },
        ];
        setCargando(false);

        localStorage.setItem("actividad", JSON.stringify(cancelarActividad));

        localStorage.setItem("mensajesGuardados", JSON.stringify(nuevo));

        setConsulta(true);
        setMensjEscribiendolo("");
        setCancelarActividad(true);

        return nuevo;
      });
    }
  }, 6);
};
