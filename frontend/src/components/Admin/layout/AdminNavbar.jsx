import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function AdminNavbar() {
    const { user } = useAuth();


    
    return (
        <header
            className="
                flex
                h-20
                items-center
                justify-between
                border-b
                border-zinc-800
                bg-zinc-950
                px-8
            "
        >

            <div>

                <h1 className="text-2xl font-bold text-white">

                    Admin Dashboard

                </h1>

                <p className="mt-1 text-sm text-zinc-500">

                    Manage problems, test cases and platform content.

                </p>

            </div>

            <div
                className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-zinc-900
                    px-4
                    py-3
                "
            >

                <div className="rounded-full bg-yellow-500 p-2">

                    <ShieldCheck
                        size={18}
                        className="text-black"
                    />

                </div>

                <div>

                    <p className="font-semibold text-white">

                        {user.fullname}

                    </p>

                    <p className="text-sm text-zinc-500">

                        Administrator

                    </p>

                </div>

            </div>

        </header>
    );
}