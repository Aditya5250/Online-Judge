import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Problems from "../pages/Problems/Problems.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard.jsx";
import ProblemDetails from "../pages/ProblemDetails/ProblemDetails.jsx";
import Leaderboard from "../pages/Leaderboard/Leaderboard.jsx";
import SubmissionHistory from "../pages/SubmissionHistory/SubmissionHistory.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLayout from "../components/Admin/layout/AdminLayout.jsx"
import AdminProblems from "../pages/Admin/Problems/AdminProblems.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User Layout */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/problems" element={<Problems />} />
                    <Route path="/problems/:slug" element={<ProblemDetails />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/submissions" element={<SubmissionHistory />} />
                </Route>

                {/* Admin */}
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="problems" element={<AdminProblems />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;