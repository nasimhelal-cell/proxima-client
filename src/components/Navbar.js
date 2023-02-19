import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto flex items-center justify-between border-b border-sky-900">
      <Link to="/" className="logo py-5 text-sky-400 text-2xl font-medium">
        Proxima
      </Link>
    </div>
  );
};

export default Navbar;
