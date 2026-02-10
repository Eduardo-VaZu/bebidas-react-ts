import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import type { SearchFilter } from "../../types";
import HeaderAlert from "./HeaderAlert";

export default function HeaderSearch() {

    const { category, fetchCategory, searchRecipes, showNotification } = useAppStore((state) => state);
    const [alert, setAlert] = useState('');
    const [searchFilter, setSearchFilter] = useState<SearchFilter>({
        search: '',
        category: ''
    })

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchFilter.search && !searchFilter.category) {
            setAlert('Complete los campos requeridos');
            showNotification({
                text: 'Complete los campos requeridos',
                error: true,
                time: 4000
            });
            return;
        }
        if (!searchFilter.search) {
            setAlert('Ingrese un término de búsqueda');
            showNotification({
                text: 'Ingrese un término de búsqueda',
                error: true,
                time: 4000
            });
            return;
        }
        if (!searchFilter.category) {
            setAlert('Seleccione una categoría');
            showNotification({
                text: 'Seleccione una categoría',
                error: true,
                time: 4000
            });

            return;
        }
        setAlert('');
        searchRecipes(searchFilter);
    }
    return (
        <form action=""
            className="w-full mt-6 text-2xl flex items-center justify-around"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="search"
                    className="text-1xl font-medium text-slate-300">
                    Buscar ingredientes
                </label>
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                            fillRule="evenodd"
                            d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        id="search"
                        name="search"
                        value={searchFilter.search}
                        onChange={handleChange}
                        placeholder="Ej. Mojito..."
                        className="w-72 md:w-96 pl-10 pr-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                </div>
                <div>
                    {alert && (
                        <HeaderAlert>
                            {alert}
                        </HeaderAlert>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-1xl font-medium text-slate-300">
                    Categoría de bebida
                </label>
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>

                    <select
                        id="category"
                        name="category"
                        value={searchFilter.category}
                        onChange={handleChange}

                        className="w-72 md:w-96 pl-10 pr-10 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    >
                        <option value="" >Seleccionar categoría...</option>
                        {
                            category.drinks.map((item) => (
                                <option key={item.strCategory} value={item.strCategory}>
                                    {item.strCategory}
                                </option>
                            ))
                        }

                    </select>
                </div>
                <div>
                    {alert && (
                        <HeaderAlert>
                            {alert}
                        </HeaderAlert>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="h-6 hidden md:block"></div>

                <button
                    type="submit"
                    className="w-72 md:w-96 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-medium border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg shadow-sky-900/20">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    <span>Buscar Resultados</span>
                </button>
            </div>
        </form >
    )
}
