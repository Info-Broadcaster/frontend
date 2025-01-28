import { Link, useLocation } from "react-router-dom";
import isAuthenticated from "./functions/IsAuthenticated";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineHistory } from "react-icons/md";

export default function Header() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header className="flex h-[8vh] w-full bg-purple-700 items-center justify-between px-8 shadow-lg">
      <Link to={"/"} className="flex items-center justify-center gap-3">
        <img
          src="/logo1.png"
          className="rounded-full h-10 w-10 filter invert brightness-0"
        />
        <div className="text-white text-2xl">Info Broadcaster</div>
      </Link>
      {isAuthenticated() ? (
        <div className="flex w-40 items-end justify-end gap-3 ">
          <Link to={"/historique"} className="text-white  ">
            <MdOutlineHistory className="text-3xl " />
          </Link>
          <Link to={"/deconnexion"} className="text-white  ">
            <IoLogOutOutline className="text-3xl " />
          </Link>
        </div>
      ) : (
        pathname != "/connexion" && (
          <Link to={"/connexion"} className="text-white text-lg ml-10">
            Connexion
          </Link>
        )
      )}
    </header>
  );
}
