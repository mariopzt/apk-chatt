import "../App.css";
import { MailPlus } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { Palette } from "lucide-react";
export function Menu({
  setMensajeTotal,
  setMensjBienvenido,
  mensajeTotal,
  cancelarActividad,
  setCancelarActividad,
  setArray_Padre,
  array_Padre,
}) {
  const verMensj = (e) => {
    console.log(e);
  };

  const borrarTexto = (e) => {
    const id = e.currentTarget.dataset.id; // <- así sí lo agarra

    if (id === "0") {
      if (cancelarActividad) {
        const nuevoArray = [...array_Padre, mensajeTotal];

        setArray_Padre(nuevoArray);

        localStorage.setItem("padreArray", JSON.stringify(nuevoArray));

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
            {array_Padre &&
              array_Padre.map((innerArray, index) => {
                if (innerArray.length > 0) {
                  const e = innerArray[0];

                  return (
                    <div onClick={verMensj} id={index} className="historia1">
                      {e.content || "Contenido no disponible"}
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
