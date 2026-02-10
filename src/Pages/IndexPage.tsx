import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/drinks/DrinkCard";

export default function IndexPage() {

  const { recipes } = useAppStore((state) => state);

  const hasDrinks = useMemo(() => recipes.drinks.length > 0, [recipes]);

  return (

    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="text-4xl font-bold uppercase">
        Recetas de las bibidas
      </div>
      {
        hasDrinks ? (
          <>
            <div className="w-full max-w-5xl px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.drinks.map((drink) => (
                  <DrinkCard key={drink.idDrink} {...drink} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-2xl font-semibold">
            No hay recetas de bebidas
          </div>
        )
      }
    </div>

  )
}
