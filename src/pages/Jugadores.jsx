import { useState, useEffect } from "react";
import axios from "axios";
import { LuPencil, LuTrash } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


 
function jugadores () {
  const [jugador, setJugador] = useState({ });
  const [jugadores, setJugadores] = useState([]);

  const obtenerValordeInput = (event) => {
    setJugador({ ...jugador, [event.target.name]: event.target.value });
  };

const guardarJugador = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/Create-Player`, jugador);
 // ✅ Cambio a create-player
      toast.success(response.data.message);
      obtenerJugadores();
    } catch (error) {
      toast.error("Hubo un error al guardar el jugador.");
      console.error(error);
    }
  };
  const eliminarJugador = async (id) => {
    try {
const response = await axios.delete(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/remove-jugadores${jugador.id}`);
      toast.success(response.data.message);
      obtenerJugadores();
    } catch (error) {
      toast.error("Error al eliminar jugador.");
      console.error(error);
    }
  };
const obtenerJugadores = async () => {
    try {
const response = await axios.get(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/jugadores`);

      setJugadores(response.data.jugadores);
    } catch (error) {
      toast.error("Error al obtener jugadores.");
      console.error(error);
    }
  };

 useEffect(() => {
    obtenerJugadores();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-8">
        <div className="p-4">
          <form>
            <div>
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre
              </label>
              <input
                onInput={obtenerValordeInput}
                name="nombre"
                type="text"
                id="nombre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Nombre"
                required
              />
            </div>
            <div>
              <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nickname
              </label>
              <input
                onInput={obtenerValordeInput}
                name="nickname"
                type="text"
                id="nickname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Nickname"
                required
              />
            </div>
            <div>
              <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Correo
              </label>
              <input
                onInput={obtenerValordeInput}
                name="correo"
                type="email"
                id="correo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Correo"
                required
              />
            </div>
            <div>
              <label htmlFor="pais" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                País
              </label>
              <input
                onInput={obtenerValordeInput}
                name="pais"
                type="text"
                id="pais"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="País"
                required
              />
            </div>
            <button onClick={guardarJugador} type="button" className="bg-green-600 rounded p-2 my-4 text-white">
              Guardar
            </button>
          </form>
        </div>

        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="grid grid-cols-4 gap-2 mt-8">
                <th className="p-4">Nombre</th>
                <th className="p-4">Nickname</th>
                <th className="p-4">Correo</th>
                <th className="p-4">País</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map((jugador) => (
                <tr key={jugador.id}>
                  <td>{jugador.nombre}</td>
                  <td>{jugador.nickname}</td>
                  <td>{jugador.correo}</td>
                  <td>{jugador.pais}</td>
                  <td>
                    <button className="bg-blue-600 text-white rounded p-2 mr-2 my-2" type="button">
                      <LuPencil />
                    </button>
                    <button
                      className="bg-red-600 text-white rounded p-2 my-2"
                      type="button"
                      onClick={() => eliminarJugador(jugador.id)}
                    >
                      <LuTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}



export  default jugadores;