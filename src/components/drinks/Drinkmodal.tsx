import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../../stores/useAppStore';

export default function Drinkmodal() {
    const { modal, setModal, recipeDetail, handleAddFavoriteRecipe, existFavoriteRecipe, removeFavoriteRecipe } = useAppStore((state) => state);

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { setModal(false) }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 backdrop-blur-md" aria-hidden="true" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative isolate w-full sm:max-w-3xl transform overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-black/5 shadow-2xl transition-all px-6 py-6 sm:my-10 sm:p-8">
                                    <Dialog.Title as="h3" className="text-slate-900 text-3xl sm:text-4xl font-extrabold my-4 sm:my-5 text-center">
                                        {recipeDetail?.strDrink ?? 'Receta'}
                                    </Dialog.Title>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="w-full">
                                            {recipeDetail?.strDrinkThumb && (
                                                <img
                                                    src={recipeDetail.strDrinkThumb}
                                                    alt={recipeDetail.strDrink}
                                                    className="w-full h-64 object-cover rounded-xl shadow-md ring-1 ring-black/5"
                                                />
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-gray-900 text-2xl font-extrabold my-3">
                                                Ingredientes y Cantidades
                                            </h3>
                                            <ul className="list-disc list-inside text-gray-800 space-y-2">
                                                {[
                                                    { ing: recipeDetail?.strIngredient1, meas: recipeDetail?.strMeasure1 },
                                                    { ing: recipeDetail?.strIngredient2, meas: recipeDetail?.strMeasure2 },
                                                    { ing: recipeDetail?.strIngredient3, meas: recipeDetail?.strMeasure3 },
                                                    { ing: recipeDetail?.strIngredient4, meas: recipeDetail?.strMeasure4 },
                                                    { ing: recipeDetail?.strIngredient5, meas: recipeDetail?.strMeasure5 },
                                                    { ing: recipeDetail?.strIngredient6, meas: recipeDetail?.strMeasure6 },
                                                ].filter(item => item.ing).map((item, idx) => (
                                                    <li key={idx}>
                                                        <span className="font-semibold">{item.ing}</span>
                                                        <span className="ml-2 text-gray-600">{item.meas ?? ''}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <h3 className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                    </h3>
                                    <Dialog.Description as="p" className="text-gray-700 leading-relaxed">
                                        {recipeDetail?.strInstructions ?? 'Sin instrucciones'}
                                    </Dialog.Description>
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setModal(false)}
                                            className="py-2 px-4 rounded-lg bg-red-600 hover:bg-red-800 text-white font-medium"
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (existFavoriteRecipe(recipeDetail.idDrink)) {
                                                    removeFavoriteRecipe(recipeDetail.idDrink);
                                                } else {
                                                    handleAddFavoriteRecipe(recipeDetail);
                                                }

                                            }}
                                            className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
                                        >
                                            {existFavoriteRecipe(recipeDetail.idDrink) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
