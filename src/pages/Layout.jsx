import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">torneo</Link>
          </li>
          <li>
            <Link to="/Torneo">Blogs</Link>
          </li>
          <li>
            <Link to="/Videojuego">Contact</Link>
          </li>
          <li>
            <Link to="/Jugadores">Jugadores</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout