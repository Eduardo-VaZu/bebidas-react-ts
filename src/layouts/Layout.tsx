import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Drinkmodal from "../components/drinks/Drinkmodal";
import Notification from "../components/notification/Notification";

export default function Layout() {
  return (
    <div>
        <Header />
        <main className="container mx-auto px-6 py-16">
            <Outlet />
        </main>
        <Drinkmodal />
        <Notification />
    </div>
  )
}
