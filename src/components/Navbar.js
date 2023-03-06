import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto flex items-center justify-between border-b border-sky-900">
      <Link to="/" className="logo py-5 text-sky-400 text-2xl font-medium">
        Proxima
      </Link>
      <nav className="flex gap-5 items-center">
        <Link to="/login" className="hover:text-sky-400 duration-300">
          Login
        </Link>
        <Link to="/signup" className="hover:text-sky-400 duration-300">
          SignUp
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
