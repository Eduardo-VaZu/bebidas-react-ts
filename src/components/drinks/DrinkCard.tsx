import type { DrinkApiResponseSchema } from "../../types";
import { useAppStore } from "../../stores/useAppStore";

export default function DrinkCard(drink: DrinkApiResponseSchema) {
    const { strDrink, strDrinkThumb } = drink;
    const { searchRecipeWithId } = useAppStore((state) => state);

    const handleClick = () => {
        searchRecipeWithId({ id: drink.idDrink });
    };

    return (
        <div className="w-full md:w-80 bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 hover:shadow-sky-900/20 hover:border-slate-600 transition-all duration-300 group">
            <div className="relative overflow-hidden h-56">
                <img
                    src={strDrinkThumb}
                    alt={strDrink}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-white truncate" title={strDrink}>
                    {strDrink}
                </h3>
                <button
                    type="button"
                    onClick={handleClick}
                    className="mt-2 w-full py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-md transition-colors flex items-center justify-center gap-2 group/btn">
                    Ver Receta
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
