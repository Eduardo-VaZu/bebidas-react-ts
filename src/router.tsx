import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import IndexPage from "./Pages/IndexPage";
// import FavoritePage from "./Pages/FavoritePage";
// import GenerateAI from "./Pages/GenerateAI";
import Layout from "./layouts/Layout";
import SpinnerLoding from "./components/spinner/SpinnerLoding";

const FavoritePageLazy = lazy(() => import("./Pages/FavoritePage"));
const IndexPageLazy = lazy(() => import("./Pages/IndexPage"));
const GenerateAIPageLazy = lazy(() => import("./Pages/GenerateAI"));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={
                        <Suspense fallback={
                            <div className="grid place-items-center min-h-[50vh]">
                                <SpinnerLoding size={70} />
                            </div>
                        }>
                            <IndexPageLazy />
                        </Suspense>
                    } index />

                    <Route path="/favorites" element={
                        <Suspense fallback={
                            <div className="grid place-items-center min-h-[50vh]">
                                <SpinnerLoding size={70} />
                            </div>
                        }>
                            <FavoritePageLazy />
                        </Suspense>
                    } />

                    <Route path="/generate" element={
                        <Suspense fallback={
                            <div className="grid place-items-center min-h-[50vh]">
                                <SpinnerLoding size={70} />
                            </div>
                        }>
                            <GenerateAIPageLazy />
                        </Suspense>
                    } />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
