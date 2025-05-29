
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/pages/Layout";
import Torneo from "../src/pages/Torneo";
import Videojuego from "../src/pages/Videojuego";
import Jugadores from "./pages/Jugadores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Torneo" element={<Torneo />} />
          <Route path="videojuego" element={<Videojuego />} />
          <Route path="Jugadores" element={<Jugadores/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;