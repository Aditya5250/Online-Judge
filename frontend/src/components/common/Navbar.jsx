import { NAV_ITEMS } from "../../constants/navigation.js";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import UserMenu from "./UserMenu";
import toast from "react-hot-toast";
import { Menu, X, LayoutDashboard, FileText, LogOut } from "lucide-react";
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();




    
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        }
    }, [menuOpen]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
            }
        }
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, []);

    //to close the mobile drawer when window is made full scree

    useEffect(()=>{
        const handleResize = () => {
            if(window.innerWidth >= 1024){
                setMenuOpen(false);
            }
        }
        window.addEventListener("resize",handleResize);

        return () => {
            window.removeEventListener("resize",handleResize);
        }
    },[]);





    //navItems

    const navItems = NAV_ITEMS;


    //handleMobileLogout

    const handleMobileLogout = () => {
        logout();
        setMenuOpen(false);
        toast.success("Logged out successfully");
    }

    return (
        <header className="fixed inset-x-0 top-4 z-50 flex justify-center">

            <nav className="w-[95%] sm:w-[92%] max-w-7xl h-[72px] px-4 sm:px-6 lg:px-8  flex items-center justify-between rounded-full border backdrop-blur-xl shadow-lg" style={{ backgroundColor: "rgba(38,38,37,0.70)", borderColor: "var(--border)" }}>

                {/* Logo */}
                <Link
                    to="/"
                    className=" group flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:rotate-6 group-hover:scale-100 " style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                        JX
                    </div>
                    <h1 className="text-xl font-bold tracking-wide transition-colors duration-300 group-hover:text-[var(--accent)] " style={{ color: "var(--text-primary)" }}>JudgeX</h1>
                </Link>


                {/*--------------      Desktop Navigation       -----------------------------------------  */}
                <div className="hidden lg:flex items-center gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path} className={({ isActive }) =>
                                `
                            px-5 
                            py-2.5 
                            rounded-full 
                            text-sm 
                            font-medium 
                            
                            transition-all 
                            duration-300 
                            ${isActive ?
                                    "bg-[var(--accent)] scale-105 shadow-lg text-black" :
                                    "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]  hover:-translate-y-0.5"
                                }
                            `
                            }
                        >{item.name}</NavLink>
                    ))}

                </div>
                {/* Desktop buttons */}
                <div className="hidden lg:flex items-center gap-4">

                    {
                        isAuthenticated
                            ? (
                                <UserMenu user={user} />
                            )
                            : (
                                <>

                                    <button className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]" style={{ color: "var(--text-primary)" }}>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </button>


                                    <button className=" px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                                        <Link to="/register">
                                            Register
                                        </Link>
                                    </button>


                                </>
                            )
                    }

                </div>
                {/*-------------------- Mobile Navigation ---------------------*/}
                <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 rounded-full transition-all hover: bg-[var(--bg-card)]" style={{ color: "var(--text-primary)" }}>
                    <Menu size={24} />
                </button>
            </nav>
            {/* Backdrop */}
            {
                menuOpen && (
                    <div
                        onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />


                )
            }

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 lg:hidden h-screen w-[80vw] border-l backdrop-blur-xl transition-transform duration-500 ease-out z-50 
                ${menuOpen ? "translate-x-0 ease-out" : "translate-x-full"}
                `} style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>

                <div className="flex justify-between items-center p-6"> {/* close button */}
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>JudgeX</h2>

                    <button onClick={() => setMenuOpen(false)} style={{ color: "var(--text-primary) " }}>
                        <X size={24} />
                    </button>

                </div>

                <hr style={{ borderColor: "var(--border)" }} />
                {/* Navigations Links */}
                <div className="flex flex-col p-5 gap-2">

                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => `
                            px-5
                            py-3
                            rounded-xl
                            transition-all
                           
                            
            
                            ${isActive ?
                                    "bg-[var(--accent)] text-black" :
                                    "text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
                                }
                            `
                            }
                        >
                            {item.name}

                        </NavLink>
                    ))
                    }

                </div>
                <div className="absolute bottom-8 left-5 right-5 space-y-3">

                    {
                        !isAuthenticated
                            ?
                            (
                                <>
                                    <button className="w-full py-3 rounded-xl border hover:bg-[var(--bg-card)] " style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
                                        <Link to="/login"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                    </button>

                                    <button className="w-full py-3 rounded-xl border font-semibold hover:scale-105 " style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                                        <Link to="/register"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Register
                                        </Link>

                                    </button>


                                </>
                            ) :
                            (
                                <>
                                    <NavLink
                                        to="/dashboard"
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) => `
                                            flex
                                            items-center
                                            gap-3
                                            px-5
                                            py-3
                                            rounded-xl
                                            transition-all
                                            duration-200
                                            ${isActive
                                                ? "bg-[var(--accent)] text-black"
                                                : "text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                                            }
                                        `}
                                    >
                                        <LayoutDashboard size={18} />
                                        Dashboard
                                    </NavLink>

                                    <NavLink
                                        to="/submissions"
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) => `
                                            flex
                                            items-center
                                            gap-3
                                            px-5
                                            py-3
                                            rounded-xl
                                            transition-all
                                            duration-200
                                            ${isActive
                                                ? "bg-[var(--accent)] text-black"
                                                : "text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                                            }
                                         `}
                                    >
                                        <FileText size={18} />
                                        Submissions
                                    </NavLink>

                                    <hr className="my-2 border-[var(--border)]" />

                                    <button
                                        onClick={handleMobileLogout}
                                        className="
                                            w-full
                                            flex
                                            items-center
                                            gap-3
                                            px-5
                                            py-3
                                            rounded-xl
                                            text-red-400
                                            transition-all
                                            duration-200
                                            hover:bg-red-500/10
                                            "
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>

                                </>
                            )

                    }




                </div>


            </div>
        </header>
    );
}

export default Navbar;