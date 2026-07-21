import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Problems from "../pages/Problems/Problems.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import ProblemDetails from "../pages/ProblemDetails/ProblemDetails.jsx";

function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/problems" element={<Problems />} />
                    <Route path="/problems/:slug" element={<ProblemDetails/>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>

            </Routes>
            
        </BrowserRouter>
    );
}

export default AppRouter;