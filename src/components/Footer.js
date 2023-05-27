import React from "react";

const Footer = () => {
  return (
    <div className="py-10 border-t-2 border-sky-500 text-center text-xl">
      &copy;{new Date().getFullYear()} - All Rights Reserved.
    </div>
  );
};

export default Footer;
