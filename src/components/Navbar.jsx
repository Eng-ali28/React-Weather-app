// start import section
import { BiBookOpen, BiHomeAlt, BiGridAlt } from "react-icons/bi";
import { WiFog } from "react-icons/wi";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// end import section
const Navbar = () => {
  const [showBar, setShowbar] = useState(false);
  const showHide = () => {
    setShowbar(!showBar);
  };
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setShowbar(false);
  });
  const LinksDesign =
    "transition-all flex font-[500] tracking-wider items-center w-[190px] lg:w-fit  space-x-2 lg:space-x-1  rounded-[10px] hover:bg-violet-600 hover:text-white px-3 py-[5px]";
  const notActive =
    "transition-all flex font-[500] tracking-wider items-center w-[190px] lg:w-fit  space-x-2 lg:space-x-1  rounded-[10px] bg-violet-600 text-white px-3 py-[5px]";
  return (
    <>
      <nav className="flex items-center justify-between p-4 relative  text-violet-600 text-[17px]">
        <div className="text-violet-500 border border-violet-500 px-3 py-2 rounded-md">
          <Link to="/">
            <WiFog size="30px" />
          </Link>
        </div>
        <div className="w-5 h-5 text-violet-500 cursor-pointer lg:hidden">
          <BiGridAlt onClick={showHide} size="1.5rem" />
        </div>
        <div
          className={
            showBar
              ? "flex flex-col items-end space-y-3 absolute rigth-0 left-0 top-[80px] w-full px-5 z-50 bg-[#23272f]/90 p-3"
              : "hidden lg:flex lg:items-center lg:justify-evenly lg:grow-[.1]"
          }
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? notActive : LinksDesign)}
          >
            <BiHomeAlt className="text-[25px]" />
            <span>Home Country</span>
          </NavLink>
          <NavLink
            to="search"
            className={({ isActive }) => (isActive ? notActive : LinksDesign)}
          >
            <BiBookOpen className="text-[25px]" />
            <span>Search</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
