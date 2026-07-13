import { NAV_ITEMS } from "../../constants/navigation.js";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="fixed inset-x-0 top-4 z-50 flex justify-center">

            <nav className="w-[95%] sm:w-[92%] max-w-7xl h-[72px] px-4 sm:px-6 lg:px-8  flex items-center justify-between rounded-full border backdrop-blur-xl shadow-lg" style={{ backgroundColor: "rgba(38,38,37,0.70)", borderColor: "var(--border)" }}>

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-11 rounded-xl flex items-center justify-center  font-bold text-lg " style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                        JX
                    </div>
                    <h1 className="text-xl font-bold tracking-wide" style={{ color: "var(--text-primary)" }}>JudgeX</h1>
                </div>


{/*--------------      Desktop Navigation       -----------------------------------------  */}
                <div className="hidden xl:flex items-center gap-2">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path} className={({ isActive }) =>
                                `
                            px-5 
                            py-2 
                            rounded-full 
                            text-sm 
                            font-medium 
                            
                            transition-all 
                            duration-300 
                            ${isActive ?
                                    "bg-[var(--accent)] text-black" :
                                    "text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                                }
                            `
                            }
                        >{item.name}</NavLink>
                    ))}

                </div>
                {/* Desktop buttons */}
                <div className="hidden xl:flex items-center gap-4">
                    <button className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]" style={{ color: "var(--text-primary)" }}>
                        Login
                    </button>

                    <button className=" px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105" style={{ background: "var(--accent)", color: "var(--bg-primary)" }}>
                        Register
                    </button>
                </div>
{/*-------------------- Mobile Navigation ---------------------*/}
                <button onClick={() => setMenuOpen(true)} className="xl:hidden p-2 rounded-full transition-all hover:bg-[var(--bg-card)]" style={{ color: "var(--text-primary)" }}>
                    <Menu size={24} />
                </button>
            </nav>
            {/* Backdrop */}
            {
                menuOpen && (
                    <div
                        onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />


                )
            }

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 h-screen w-[55vw] border-l backdrop-blur-xl transition-transform duration-300 z-50 
                ${menuOpen ? "translate-x-0 ease-out" : "translate-x-full"}
                `} style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>

                <div className="flex justify-between items-center p-6"> {/* close button */}
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>JudgeX</h2>

                    <button onClick={() => setMenuOpen(false)} style={{ color: "var(--text-primary) " }}>
                        <X size={24} />
                    </button>

                </div>

                <hr style={{ borderColor: "var(--border)" }} />
                {/* Navigations Links (Home,Problems,Dashboard) */}
                <div className="flex flex-col p-5 gap-2">

                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={()=>setMenuOpen(false)}
                            className={({isActive})=>`
                            px-5
                            py-3
                            rounded-xl
                            transition-all
                           
                            
            
                            ${
                                isActive?
                                "bg-[var(--accent)] text-black":
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
                    <button className="w-full py-3 rounded-xl border hover:bg-[var(--bg-card)] " style={{borderColor:"var(--border)",color:"var(--text-primary)"}}>
                        Login
                    </button>
                    <button className="w-full py-3 rounded-xl border font-semibold hover:scale-105 " style={{background:"var(--accent)",color:"var(--bg-primary)"}}>
                        Register
                    </button>

                </div>
                

            </div>
        </header>
    );
}

export default Navbar;