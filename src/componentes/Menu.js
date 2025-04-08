import "../App.css";
import { Plus } from "lucide-react";
import { Settings } from "lucide-react";
import { Twitter } from "lucide-react";
import { Instagram } from "lucide-react";

export function Menu({ setMensajeTotal, setMensjBienvenido }) {
  const borrarTexto = (e) => {
    const id = e.target.id;
    if (id === "0") {
      setMensajeTotal([]);
      setMensjBienvenido(true);
      localStorage.removeItem("valorBienvenido");
      localStorage.removeItem("mensajesGuardados");
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
      <div className="padreMenuIsquierda">
        <div className="menu__opcion_Padre">
          <div className="menu__opcion">
            <Plus size={22} id="0" color="#c5c4c4" onClick={borrarTexto} />
          </div>
          <div className="menu__opcion" id="1" onClick={borrarTexto}>
            {" "}
            <Settings size={22} color="#c5c4c4" id="2" onClick={borrarTexto} />
          </div>
          <div className="menu__opcion">
            <Twitter size={22} color="#c5c4c4" id="3" onClick={borrarTexto} />
          </div>
          <div className="menu__opcion">
            <Instagram size={22} color="#c5c4c4" id="4" onClick={borrarTexto} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
