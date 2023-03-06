import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar container mx-auto flex items-center justify-between border-b border-sky-900">
      <Link to="/" className="logo py-5 text-sky-400 text-2xl font-medium">
        Proxima
      </Link>
      <nav className="flex gap-5 items-center">
        {!user && (
          <div className="flex gap-5 items-center">
            <Link to="/login" className="hover:text-sky-400 duration-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-sky-400 duration-300">
              SignUp
            </Link>
          </div>
        )}

        {user && (
          <div className="flex gap-5 items-center">
            <span>{user.email}</span>
            <button
              onClick={handleLogout}
              type="submit"
              className="bg-rose-500 text-white px-7 py-3 rounded-lg hover:bg-sky-50 hover:text-slate-900 duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
