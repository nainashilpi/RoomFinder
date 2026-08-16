import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaSignOutAlt,
  FaChevronDown,
  FaHome,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";

import logo from "../images/logo.jpg";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // AUTH STATE
  // =====================================================

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // =====================================================
  // POST DROPDOWN
  // =====================================================

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // =====================================================
  // CHECK LOGIN STATUS
  // =====================================================

  useEffect(() => {

    const checkAuth = () => {
      setIsLoggedIn(
        !!localStorage.getItem("token")
      );
    };

    checkAuth();

    window.addEventListener(
      "authChange",
      checkAuth
    );

    return () => {
      window.removeEventListener(
        "authChange",
        checkAuth
      );
    };

  }, [location.pathname]);

  // =====================================================
  // CLOSE DROPDOWN OUTSIDE CLICK
  // =====================================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setDropdownOpen(false);

    // Notify other components
    window.dispatchEvent(
      new Event("authChange")
    );

    navigate("/");
  };


  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#0A1931] shadow-lg border-b border-[#4A7FA7] z-50">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            <img
              src={logo}
              alt="RoomFinder Logo"
              className="w-12 h-12 rounded-full bg-white p-1 shadow-md object-contain transition duration-300 group-hover:rotate-6"
            />

            <div>

              <h1 className="text-2xl font-bold text-white leading-none">

                Room
                <span className="text-[#5996FF]">
                  Finder
                </span>

              </h1>

              <p className="text-xs text-blue-100 mt-1">
                Find Your Perfect Room
              </p>

            </div>

          </Link>


          {/* ================================================= */}
          {/* NAVIGATION */}
          {/* ================================================= */}

          <ul className="hidden md:flex items-center gap-8 font-medium text-[#B3CFE5]">

            {/* HOME */}

            <li>

              <Link
                to="/"
                className={`transition duration-300 ${
                  location.pathname === "/"
                    ? "text-white font-semibold"
                    : "hover:text-white"
                }`}
              >
                Home
              </Link>

            </li>


            {/* FIND STAY */}

            <li>

              <Link
                to="/findStay"
                className={`transition duration-300 ${
                  location.pathname === "/findStay"
                    ? "text-white font-semibold"
                    : "hover:text-white"
                }`}
              >
                FindStays
              </Link>

            </li>


            {/* ROOMIES */}

            <li>

              <Link
                to="/roomies"
                className={`transition duration-300 ${
                  location.pathname === "/roomies"
                    ? "text-white font-semibold"
                    : "hover:text-white"
                }`}
              >
                Roomies
              </Link>

            </li>


            {/* ================================================= */}
            {/* POST */}
            {/* ================================================= */}

            {isLoggedIn && (

              <li
                className="relative"
                ref={dropdownRef}
              >

                <button
                  onClick={() =>
                    setDropdownOpen(
                      !dropdownOpen
                    )
                  }
                  className="flex items-center gap-2 hover:text-white transition"
                >

                  + Post

                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      dropdownOpen
                        ? "rotate-180"
                        : ""
                    }`}
                    size={12}
                  />

                </button>


                {/* POST DROPDOWN */}

                {dropdownOpen && (

                  <div className="absolute right-0 mt-3 w-56 bg-[#0f2b48] border border-[#4A7FA7] rounded-xl shadow-2xl py-2 z-50">

                    {/* ADD PROPERTY */}

                    <Link
                      to="/addProperty"
                      onClick={() =>
                        setDropdownOpen(false)
                      }
                      className="flex items-center gap-3 px-4 py-3 text-[#B3CFE5] hover:bg-[#1A3D63] hover:text-white transition"
                    >

                      <FaBuilding />

                      <div>

                        <p className="font-semibold">
                          Add Property
                        </p>

                        <p className="text-xs text-gray-400">
                          Post your room or PG
                        </p>

                      </div>

                    </Link>


                    {/* ADD ROOMMATE */}

                    <Link
                      to="/addRoommate"
                      onClick={() =>
                        setDropdownOpen(false)
                      }
                      className="flex items-center gap-3 px-4 py-3 text-[#B3CFE5] hover:bg-[#1A3D63] hover:text-white transition"
                    >

                      <FaUsers />

                      <div>

                        <p className="font-semibold">
                          Add Roommate
                        </p>

                        <p className="text-xs text-gray-400">
                          Find a compatible roommate
                        </p>

                      </div>

                    </Link>

                  </div>

                )}

              </li>

            )}

          </ul>


          {/* ================================================= */}
          {/* RIGHT SIDE AUTH */}
          {/* ================================================= */}

          <div className="flex items-center gap-4">

            {!isLoggedIn ? (

              <>
                {/* LOGIN */}

                <Link
                  to="/login"
                  className="px-4 py-2 border border-[#B3CFE5] text-[#F6FAFD] rounded-lg hover:bg-[#4A7FA7] transition duration-300 text-sm font-semibold"
                >
                  Login
                </Link>


                {/* REGISTER */}

                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#4A7FA7] text-white rounded-lg hover:bg-[#1A3D63] transition duration-300 text-sm font-semibold shadow-md"
                >
                  Register
                </Link>

              </>

            ) : (

              /* =================================================
                 LOGOUT
                 ================================================= */

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-[#4A7FA7] text-white rounded-lg hover:bg-red-500 transition duration-300 text-sm font-semibold shadow-md"
              >

                <FaSignOutAlt />

                Logout

              </button>

            )}

          </div>

        </div>

      </nav>


      {/* =====================================================
          SPACING FOR FIXED NAVBAR
          ===================================================== */}

      <div className="h-[80px] w-full" />

    </>
  );
}

export default Navbar;