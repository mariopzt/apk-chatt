import "../App.css";
import { MailPlus } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { Palette } from "lucide-react";
export function Menu({
  setMensajeTotal,
  setMensjBienvenido,
  cancelarActividad,
  setCancelarActividad,
}) {
  const borrarTexto = (e) => {
    const id = e.currentTarget.dataset.id; // <- así sí lo agarra
    console.log(id);
    console.log(cancelarActividad);

    if (id === "0") {
      if (cancelarActividad) {
        console.log("entra");
        setMensajeTotal([]);
        setMensjBienvenido(true);
        localStorage.removeItem("valorBienvenido");
        localStorage.removeItem("mensajesGuardados");
      }
    } else if (id === "1") {
      console.log("Abrir configuración");
    }
  };

  return (
    <div className="menu">
      <div className="derechaMenu">
        <div onClick={borrarTexto} data-id="0" className="menuDerecha">
          <MailPlus size={25} strokeWidth={1} color="#c5c4c4" />
          <h3 className="ajuste">New Chat</h3>
        </div>
        <div onClick={borrarTexto} data-id="1" className="ajustes">
          <SlidersHorizontal size={25} strokeWidth={1} color="#c5c4c4" />
          <h3 className="ajuste">Settings</h3>
        </div>
        <div onClick={borrarTexto} data-id="2" className="ajustes">
          <Palette size={25} strokeWidth={1} color="#c5c4c4" />
          <h3 className="ajuste">Settings</h3>
        </div>

        <div className="historial">
          <div className="historia">Chat History</div>
          <div className="history">
            <div className="historia1">Today</div>
            <div className="historia1">Yesterday</div>
            <div className="historia1">Last 7 days</div>
            <div className="historia1">Last 30 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
