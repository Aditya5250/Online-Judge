import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";

function layout(){
    return (
       <>
        <Navbar />
        <main className="pt-28">
            <Outlet />
        </main>
        
       
       </>
    )
}

export default layout;