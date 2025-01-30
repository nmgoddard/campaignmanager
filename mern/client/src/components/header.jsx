import { NavLink } from "react-router-dom";

export default function Header(){
    return(
    <div className="m-0 absolute top-0 left-0 right-0 w-full bg-jade-700 p-3">
        <NavLink to="/" className="text-yellow-500 text-4xl">
            Game Master's Familiar
        </NavLink>
    </div>
  

    )
    

}