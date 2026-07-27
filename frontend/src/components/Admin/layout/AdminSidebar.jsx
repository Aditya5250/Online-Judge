import {
    LayoutDashboard,
    BookOpen,
    Home,
    LogOut,
    ShieldCheck,
} from "lucide-react";



import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


export default function AdminSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClasses = ({ isActive }) =>
        `
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        transition-all
        duration-300
        ${
            isActive
                ? "bg-yellow-500 text-black font-semibold"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }
    `;

    return (
        <aside className="flex w-72 flex-col border-r border-zinc-800 bg-zinc-900">

            {/* Logo */}

            <div className="border-b border-zinc-800 p-6">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-yellow-500 p-3">

                        <ShieldCheck
                            size={24}
                            className="text-black"
                        />

                    </div>

                    <div>

                        <h2 className="text-xl font-bold text-white">

                            JudgeX

                        </h2>

                        <p className="text-sm text-zinc-500">

                            Admin Panel

                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 space-y-2 p-4">

                <NavLink
                    end
                    to="/admin"
                    className={linkClasses}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/problems"
                    className={linkClasses}
                >
                    <BookOpen size={20} />
                    Problems
                </NavLink>

                <NavLink
                    to="/"
                    className={linkClasses}
                >
                    <Home size={20} />
                    Back to JudgeX
                </NavLink>

            </nav>

            {/* Logout */}

            <div className="border-t border-zinc-800 p-4">

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        py-3
                        text-red-400
                        transition-all
                        duration-300
                        hover:bg-red-500/10
                    "
                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
}