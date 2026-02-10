import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";

export default function Header() {

    const { pathname } = useLocation();
    const isHome = useMemo(() => pathname === "/", [pathname]);

    return (
        <header className="bg-slate-800 ">
            <div className="container mx-auto px-5 py-6 ">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-24 h-24"
                            src="/logo.svg"
                            alt="logotipo" />
                    </div>
                    <nav className="font-bold text-3xl">
                        <ul className="flex items-center justify-between gap-10">
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? "text-white" : "text-slate-300"}>
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/favorites" className={({ isActive }) => isActive ? "text-white" : "text-slate-300"}>
                                    Favoritos
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                </div>
                {
                    isHome && (
                        <HeaderSearch />
                    )
                }
            </div>
        </header>
    )
}
