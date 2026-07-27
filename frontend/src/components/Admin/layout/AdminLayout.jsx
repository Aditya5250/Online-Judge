import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-zinc-950">

            <AdminSidebar />

            <div className="flex flex-1 flex-col">

                <AdminNavbar />

                <main className="flex-1 overflow-y-auto p-8">


                    <Outlet />
                    

                </main>

            </div>

        </div>
    );
}