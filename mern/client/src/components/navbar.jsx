import { NavLink } from "react-router-dom";
import logo from "../assets/LogoIdea1.webp";

export default function Navbar() {
  
  return (
    <div>
      <nav className="flex flex-col justify-between items-center mb-6 absolute left-5 w-10">
        <NavLink to="/notes">
          Notes
        </NavLink>
        <NavLink to="/characters">
          Characters
        </NavLink>
        <NavLink to="/monsters">
          Monsters
        </NavLink>
        <NavLink to="/search">
          Search
        </NavLink>
        <NavLink to="/rules">
          Rules
        </NavLink>
      </nav>
    </div>
  );
}
