import React from "react";
import { BiCopyright } from "react-icons/bi";
const Footer = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-violet-600/50 text-white text-[24px]">
      by Ali Hamoud {new Date().getUTCFullYear()} <BiCopyright />
    </div>
  );
};

export default Footer;
