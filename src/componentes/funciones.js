export const preguntasEchas = (e, setDispararPregunta, setMensajeEnviado) => {
  setDispararPregunta(true);
  setMensajeEnviado(e.currentTarget.innerText);
};
