import axios from "axios";
import { useEffect,useState } from "react";
import { LuPencil,LuTrash } from "react-icons/lu";
import { toast,ToastContainer } from "react-toastify";


function Videojuego () {
const [videojuegos, setVideojuegos] = useState([]); 
const [videojuegoForm, setvideojuegoForm] = useState({});

useEffect(() => {
        obtenerVideojuegos();
    }, []);

 function obtenerVideojuegos(){
       axios.get(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/videojuegos`).then((response) => {
            console.log(response.data.data)
           console.log("Respuesta completa:", response.data);
setVideojuegos(response.data.videojuegos);
        }).finally(() => {
            console.log(videojuegos);
        });
    }

 function guardarVideojuego() {
       axios.post(`${import.meta.env.VITE_TORNEO_ENDPOINT}/api/guardar-videojuego`, videojuegoForm).then(response => {
            toast("Guardado exitoso");
            obtenerVideojuegos();
        })
    }

function obtenerValordeInput (e){
  const obj = {
    ...videojuegoForm,
    [e.target.name]: e.target.value,
  }
  setvideojuegoForm(obj);
}
return <>
   <div className="grid grid-cols-2 gap-2 mt-8">
    <div className="p-4">
        <form >
        <div>
            <label For="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre videojuego</label>
            <input onInput={(event) => obtenerValordeInput(event)} name="nombre" type="text" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre videojuego" required />
        </div>


 <div>
            <label for="tipo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo videojuego</label>
            <input onInput={obtenerValordeInput} name="tipo" type="text" id="tipo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tipo videojuego" required />
        </div>

        <button onClick={guardarVideojuego} type="button" className="bg-green-600 rounded p-2 my-4 text-white">Guardar</button>
        </form>
      </div>
      <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
         
            <tr className="grid grid-cols-2 gap-2 mt-8">
                <th className="p-4">Nombre de videojuego</th>
                <th className="p-4">Tipo de videojuego</th>
                <th></th>
            </tr>
        </thead>
    <tbody>
  {
  videojuegos.length > 0 ? (
  videojuegos.map(videojuego => (
    <tr key={videojuego.id}>
      <td>{videojuego.nombre}</td>
      <td>{videojuego.tipo}</td>
      <td>
        <button className='bg-blue-600 text-white rounded p-2 mr-2 my-2' type='button'> <LuPencil/></button>
        <button className='bg-red-600 text-white rounded p-2 my-2'> <LuTrash/></button>         
      </td>
    </tr>
  ))
) : <tr><td colSpan="3">Cargando videojuegos...</td></tr>}
</tbody>
       </table>
      </div>
      <ToastContainer/>
    
    </div>
   
    </>
}

export default Videojuego;