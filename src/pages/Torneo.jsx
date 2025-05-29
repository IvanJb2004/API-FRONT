import axios from 'axios';
import {  useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { TournamentModal } from '../components/TournamentModal';

import { ToastContainer, toast } from 'react-toastify';
function torneo() {
  const [tournaments, setTournament] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentTournament, setCurrentTournament] = useState({});
  const [games, setGames] = useState([]);


  useEffect(() => {
    fetchTournament();
    fetchVideoGames();
  }, []);

const fetchTournament = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/tournament');

    if (response.status === 200 && response.data) {
      console.log("Datos recibidos:", response.data);

      // 🔹 Aquí se actualiza el estado correctamente
      setTournament(Array.isArray(response.data.data) ? response.data.data : []);
    } else {
      console.error("Estructura inesperada en la respuesta:", response.data);
      setTournament([]); // Evita errores si la API devuelve datos inesperados
    }
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    setTournament([]); // Evita que `tournaments` sea undefined
  }
};
  const fetchVideoGames = () => {
    axios.get(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/videojuegos`).then((response) => {
      setGames(response.data.videojuegos);
    }).catch(error => {
      console.log(error);
    })
  }

   const setModalEditInfo = (tournament) => {
    setIsModalShow(true);
    setCurrentTournament(tournament);
  }

  const handleChangeTournament = (event) => {
    setCurrentTournament({
      ...currentTournament,
      [event.name]: event.value
    })
  }

   const createOrUpdateTournament = async () => {
    if (!currentTournament.nombre || !currentTournament.limite_de_equipo || !currentTournament.modalidad || !currentTournament.videojuego_id) {
        toast.error("Todos los campos son obligatorios");
        return;
    }

    const data = {
        nombre: currentTournament.nombre,
        limite_de_equipo: currentTournament.limite_de_equipo,
        modalidad: currentTournament.modalidad,
        videojuego_id: currentTournament.videojuego_id
    };

    try {
        if (currentTournament.id) {
    await axios.put(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/update-tournament/${currentTournament.id}`, data);
    toast.success("Actualización exitosa");

            toast.success("Actualización exitosa");
        } else {
            if (!currentTournament.videojuego_id) {
                toast.error("Error: ID de videojuego no válido");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_TORNEO_ENDPOINT}/api/create-tournament/${currentTournament.videojuego_id}`,
                { ...data, premio: "Una puecca" });

            toast.success("Creación exitosa");

        }

        setIsModalShow(false);
        fetchTournament();
    } catch (error) {
        console.error("Error en la operación:", error);
        toast.error("Hubo un problema en la solicitud");
    }
};
 const removeTournament = async (tournamentId) => {
  if (!tournamentId) {
    console.error("ID del torneo no válido");
    toast.error("No se puede eliminar: ID inválido");
    return;
  }

  const isConfirm = window.confirm("¿Estás seguro de que deseas borrar este torneo?");
  if (!isConfirm) return;

  try {
    await axios.delete(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/remove-tournament/${tournamentId}`);
    
    toast.success("Eliminación exitosa");
    fetchTournament(); // Refresca la lista

  } catch (error) {
    console.error("Error al eliminar torneo:", error);
    toast.error("Hubo un problema al eliminar el torneo");
  }
};

 const openTournamentModal = () => {
    setCurrentTournament({});
    setIsModalShow(true);
  }

 return (
    <>
      <TournamentModal 
        games={games}
        tournament={currentTournament} 
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeTournament={(e) => handleChangeTournament(e)}
        onSubmit={() => createOrUpdateTournament()}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold text-black mb-8">
        Torneos
      </h1>
      <button className='bg-green-700 text-white rounded shadow-md p-2 my-4' onClick={() => openTournamentModal()}> Crear Torneo </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
              <th className='px-6 py-3'>Nombre del torneo</th>
              <th className='px-6 py-3'>Limite_de_equipo</th>
              <th className='px-6 py-3'>Modalidad</th>
              <th className='px-6 py-3'>Video Juego</th>
              <th className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(tournaments) && tournaments.length > 0 ? (
    tournaments.map(tournament => (
      <tr key={tournament.id}>
        <td>{tournament.nombre}</td>
        <td>{tournament.limite_equipos}</td>
        <td>{tournament.modalidad}</td>
        <td>{tournament.videojuego?.nombre ?? "Sin videojuego"}</td>
        <td>
          <button onClick={() => setModalEditInfo(tournament)}>✏️</button>
          <button onClick={() => removeTournament(tournament.id)}>🗑️</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center">No hay torneos disponibles</td>
    </tr>
  )}
</tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
    </>
  
  );
}

export default torneo;