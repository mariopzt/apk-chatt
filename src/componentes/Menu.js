import "../App.css";
import { MailPlus } from "lucide-react";
export function Menu({
  setMensajeTotal,
  setMensjBienvenido,
  cancelarActividad,
  setCancelarActividad,
}) {
  const borrarTexto = (e) => {
    console.log(cancelarActividad);
    console.log(e);

    const id = e.target.id;

    if (id === "0") {
      if (!cancelarActividad) {
        setMensajeTotal([]);
        setMensjBienvenido(true);
        setCancelarActividad(() => {
          const acti = true;
          localStorage.setItem("actividad", JSON.stringify(acti));
          return acti;
        });
        localStorage.removeItem("valorBienvenido");
        localStorage.removeItem("mensajesGuardados");
      }
    } else if (id === "1") {
      console.log("Abrir configuración");
    } else if (id === "2") {
      window.open("https://twitter.com", "_blank");
    } else if (id === "3") {
      window.open("https://instagram.com", "_blank");
    }
  };

  return (
    <div className="menu">
      <div className="derechaMenu">
        <div onClick={borrarTexto} data-id="0" className="menuDerecha">
          <MailPlus size={25} strokeWidth={1} color="#c5c4c4" />
          <h3 className="ajuste">New Chat</h3>
        </div>
        <div onClick={borrarTexto} data-id="1" className="menuDerecha">
          <MailPlus size={25} strokeWidth={1} color="#c5c4c4" />
          <h3 className="ajuste">New Chat</h3>
        </div>
      </div>
    </div>
  );
}

export default Menu;
