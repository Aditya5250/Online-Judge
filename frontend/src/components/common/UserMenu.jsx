import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const MENU_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: FileText,
    label: "Submissions",
    to: "/submissions",
  },
];

function UserMenu({ user }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const { logout } = useAuth();

  const getInitials = (username = "") =>
    username
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully!");

    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      {/* Avatar Button */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          items-center
          gap-2
          rounded-full
          transition-all
          duration-300
          hover:scale-105
        "
      >
        <div
          className="
            h-10
            w-10
            rounded-full
            flex
            items-center
            justify-center
            font-semibold
            border
            shadow-md
          "
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
            borderColor: "var(--border)",
          }}
        >
          {getInitials(user?.fullname)}
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
          style={{ color: "var(--text-primary)" }}
        />
      </button>

      {/* Dropdown */}

      <div
        className={`
          absolute
          right-0
          mt-4
          w-72
          rounded-2xl
          border
          backdrop-blur-xl
          shadow-2xl
          transition-all
          duration-200
          origin-top-right
          z-50

          ${open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible pointer-events-none"
          }
        `}
        style={{
          background: "rgba(38,38,37,0.95)",
          borderColor: "var(--border)",
        }}
      >
        {/* User Info */}

        <div className="p-5">
          <div className="flex items-center gap-4">
            <div
              className="
                h-12
                w-12
                rounded-full
                flex
                items-center
                justify-center
                font-bold
                text-lg
              "
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              {getInitials(user?.fullname)}
            </div>

            <div className="min-w-0">
              <h3
                className="font-semibold truncate"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                {user?.fullname}
              </h3>

              <p
                className="text-sm truncate"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "var(--border)" }} />

        {/* Admin Panel */}

        {user?.role === "ADMIN" && (
          <>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/admin");
              }}
              className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-4
                transition-all
                duration-200
                hover:bg-yellow-500/10
              "
              style={{
                color: "var(--accent)",
              }}
            >
              <ShieldCheck size={18} />

              <span>Admin Panel</span>
            </button>

            <hr style={{ borderColor: "var(--border)" }} />
          </>
        )}

        {/* Logout */}

        {/* Navigation */}

        <div className="py-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  transition-all
                  duration-200
                  rounded-xl

                  ${isActive ? "bg-[var(--accent)] text-black" : "text-[var(--text-primary)] hover:bg-[var(--bg-card)]"}
                
                  `
                }

              >
                <Icon size={18} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <hr style={{ borderColor: "var(--border)" }} />

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-5
            py-4
            transition-all
            duration-200
            hover:bg-red-500/10
          "
          style={{
            color: "#ef4444",
          }}
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default UserMenu;