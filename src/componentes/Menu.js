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
  let lastSelectedMessage = null;

  const verMensj = (e) => {
    const i = e.target.id;
    const documentoEstilos = document.getElementById(i);
    if (lastSelectedMessage && lastSelectedMessage.id !== documentoEstilos.id) {
      console.log("object");
      lastSelectedMessage.style.backgroundColor = "";
    }

    // Marca el mensaje actual con color rojo
    if (documentoEstilos) {
      documentoEstilos.style.backgroundColor = "red";
    }
    console.log(array_Padre[i]);
    const mensjPasad = array_Padre[i];
    setMensajeTotal(mensjPasad);
  };

  const borrarTexto = (e) => {
    const id = e.currentTarget.dataset.id;
    if (id === "0") {
      if (cancelarActividad) {
        const nuevoArray = [mensajeTotal, ...array_Padre];
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
                    <div
                      key={index}
                      onClick={verMensj}
                      id={index}
                      className="historia1"
                    >
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
