import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



export default function AdminRoute({ children }) {


    const {
        user,
        loading,
        isAuthenticated,
    } = useAuth();



    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-zinc-950">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
            </div>
        );
    }




    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    if (user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }


    return children;
}