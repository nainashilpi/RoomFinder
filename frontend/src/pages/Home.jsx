import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import backgroundImage from "../images/backgroundImg.jpg";

import {
FaSearch,
FaBuilding,
FaUserFriends,
FaMapMarkerAlt,
FaRupeeSign,
FaCheckCircle,
FaShieldAlt,
FaWallet,
FaArrowRight,
FaStar,
FaHome,
FaHeart,
FaBolt,
FaUserCheck,
FaQuoteLeft,
} from "react-icons/fa";

function Home() {
const navigate = useNavigate();

const [activeTab, setActiveTab] = useState("stays");
const [searchQuery, setSearchQuery] = useState("");
const [budgetRange, setBudgetRange] = useState("All");

// =========================
// FEATURED PROPERTIES
// =========================

const rooms = [
{
id: 1,
image:
"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
title: "Premium Single Studio Loft",
location: "MP Nagar, Bhopal",
price: 6500,
badge: "Verified Listing",
rating: "4.8",
},
{
id: 2,
image:
"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
title: "Luxury PG for Girls",
location: "Vijay Nagar, Indore",
price: 4800,
badge: "Highly Rated",
rating: "4.9",
},
{
id: 3,
image:
"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
title: "Spacious 2BHK Smart Flat",
location: "Connaught Place, Delhi",
price: 12000,
badge: "Popular Choice",
rating: "4.7",
},
];

// =========================
// HOW IT WORKS
// =========================

const steps = [
{
id: "01",
icon: <FaSearch />,
title: "Search Your Way",
description:
"Explore rooms, PGs, flats or compatible roommates based on your preferred location and budget.",
},
{
id: "02",
icon: <FaUserCheck />,
title: "Compare & Connect",
description:
"Check property details, amenities and roommate lifestyle preferences before making a choice.",
},
{
id: "03",
icon: <FaHome />,
title: "Find Your Match",
description:
"Contact property owners or compatible roommates directly and find your next perfect space.",
},
];

// =========================
// FEATURES
// =========================

const features = [
{
icon: <FaShieldAlt />,
title: "Trusted Profiles",
description:
"Discover property listings and roommate profiles with detailed information for safer decisions.",
},
{
icon: <FaWallet />,
title: "Budget Friendly",
description:
"Find rooms and roommates that match your monthly budget without unnecessary complications.",
},
{
icon: <FaBolt />,
title: "Quick Discovery",
description:
"Search and filter listings quickly to find suitable properties and roommate profiles.",
},
];

// =========================
// SEARCH HANDLER
// =========================

const handleSearchExecution = (e) => {
  e.preventDefault();

  const encodedCity = encodeURIComponent(searchQuery);

  if (activeTab === "stays") {
    navigate("/findStay?city=" + encodedCity + "&budget=" + budgetRange);
  } else {
    navigate("/roomies?city=" + encodedCity + "&budget=" + budgetRange);
  }
};

return (
  <>
    <style>{`
      @keyframes rfFadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes rfFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes rfFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes rfPulseGlow {
        0%, 100% { opacity: .18; transform: scale(1); }
        50% { opacity: .28; transform: scale(1.06); }
      }
      .rf-fade-up { animation: rfFadeUp .7s cubic-bezier(.22,1,.36,1) both; }
      .rf-fade-in { animation: rfFadeIn .8s ease both; }
      .rf-float { animation: rfFloat 5s ease-in-out infinite; }
      .rf-glow { animation: rfPulseGlow 5s ease-in-out infinite; }
      .rf-delay-1 { animation-delay: .08s; }
      .rf-delay-2 { animation-delay: .16s; }
      .rf-delay-3 { animation-delay: .24s; }
      .rf-delay-4 { animation-delay: .32s; }
      @media (prefers-reduced-motion: reduce) {
        .rf-fade-up, .rf-fade-in, .rf-float, .rf-glow {
          animation: none !important;
        }
      }
    `}</style>
    <div className="min-h-screen bg-[#F4F8FB]">

  {/* ================================================= */}
  {/* HERO SECTION */}
  {/* ================================================= */}

  <section
    className="relative min-h-[500px] bg-cover bg-center bg-no-repeat flex items-center overflow-hidden"
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
  >

    {/* NAVY OVERLAY */}

    <div className="absolute inset-0 bg-[#0A1931]/80" />

    {/* DECORATIVE GLOW */}

    <div className="absolute w-[500px] h-[500px] bg-[#4A7FA7]/20 rounded-full blur-3xl -top-40 -right-40 rf-glow pointer-events-none" />

    <div className="absolute w-[400px] h-[400px] bg-[#4A7FA7]/10 rounded-full blur-3xl -bottom-40 -left-40 rf-glow pointer-events-none" />

    {/* HERO CONTENT */}

    <div className="relative z-10 max-w-7xl mx-auto px-5 py-20 w-full rf-fade-in">

      <div className="max-w-4xl mx-auto text-center">

        {/* HERO BADGE */}

        <div className="inline-flex items-center gap-2 bg-white/10 rf-fade-up rf-delay-1 border border-white/10 backdrop-blur-md text-[#B3CFE5] px-4 py-2 rounded-full text-sm font-semibold">

          <FaHome className="text-[#8DB5D3]" />

          Your Next Home Starts Here

        </div>

        {/* HEADING */}

        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl rf-fade-up rf-delay-2 font-extrabold tracking-tight leading-[1.1] mt-7">

          Find a Place.

          <br />

          Find Your{" "}

          <span className="text-[#8DB5D3]">
            Perfect Match.
          </span>

        </h1>

        {/* SUB HEADING */}

        <p className="text-[#B3CFE5] text-base md:text-lg max-w-2xl rf-fade-up rf-delay-3 mx-auto mt-6 leading-8">

          Discover rooms, PGs, apartments and compatible roommates
          based on your location, lifestyle and budget.

        </p>

        {/* ================================================= */}
        {/* SEARCH CONSOLE */}
        {/* ================================================= */}

        <div className="bg-white rounded-3xl shadow-2xl mt-10 rf-fade-up rf-delay-4 p-3 md:p-4 text-left">

          {/* SEARCH TABS */}

          <div className="flex gap-2 border-b border-gray-100 pb-3">

            <button
              onClick={() => setActiveTab("stays")}
              className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "stays"
                  ? "bg-[#0A1931] text-white shadow-md"
                  : "text-gray-500 hover:bg-[#F4F8FB]"
              }`}
            >

              <FaBuilding />

              Find a Stay

            </button>

            <button
              onClick={() => setActiveTab("roomies")}
              className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "roomies"
                  ? "bg-[#0A1931] text-white shadow-md"
                  : "text-gray-500 hover:bg-[#F4F8FB]"
              }`}
            >

              <FaUserFriends />

              Find Roommates

            </button>

          </div>

          {/* SEARCH FORM */}

          <form
            onSubmit={handleSearchExecution}
            className="flex flex-col lg:flex-row gap-3 mt-4"
          >

            {/* LOCATION */}

            <div className="flex-[2] flex items-center bg-[#F4F8FB] border border-gray-200 rounded-xl px-4">

              <FaMapMarkerAlt className="text-[#4A7FA7]" />

              <input
                type="text"
                placeholder={
                  activeTab === "stays"
                    ? "Search city, college or area..."
                    : "Where do you need a roommate?"
                }
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full bg-transparent px-3 py-4 outline-none text-gray-700 text-sm"
              />

            </div>

            {/* BUDGET */}

            <select
              value={budgetRange}
              onChange={(e) =>
                setBudgetRange(e.target.value)
              }
              className="lg:w-52 bg-[#F4F8FB] border border-gray-200 rounded-xl px-4 py-4 outline-none text-gray-600 text-sm font-semibold"
            >

              <option value="All">
                Any Budget
              </option>

              <option value="5000">
                Under ₹5,000
              </option>

              <option value="10000">
                Under ₹10,000
              </option>

              <option value="15000">
                Under ₹15,000
              </option>

              <option value="25000">
                Under ₹25,000
              </option>

            </select>

            {/* SEARCH BUTTON */}

            <button
              type="submit"
              className="bg-[#4A7FA7] hover:bg-[#0A1931] text-white px-7 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >

              <FaSearch />

              Search Now

            </button>

          </form>

        </div>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <div className="grid grid-cols-3 max-w-2xl mx-auto mt-10 rf-fade-up rf-delay-4 divide-x divide-white/20">

          <div>

            <p className="text-white text-2xl md:text-3xl font-extrabold">
              12K+
            </p>

            <p className="text-[#B3CFE5] text-xs md:text-sm mt-1">
              Properties
            </p>

          </div>

          <div>

            <p className="text-white text-2xl md:text-3xl font-extrabold">
              8K+
            </p>

            <p className="text-[#B3CFE5] text-xs md:text-sm mt-1">
              Roommates
            </p>

          </div>

          <div>

            <p className="text-white text-2xl md:text-3xl font-extrabold">
              45+
            </p>

            <p className="text-[#B3CFE5] text-xs md:text-sm mt-1">
              Cities
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* ================================================= */}
  {/* QUICK DISCOVERY SECTION */}
  {/* ================================================= */}

  <section className="max-w-7xl mx-auto px-5 py-20">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* FIND PROPERTY */}

      <div className="relative overflow-hidden bg-[#0A1931] rounded-3xl p-8 md:p-10 group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl rf-fade-up">

        <div className="absolute w-60 h-60 bg-[#4A7FA7]/20 rounded-full blur-3xl -right-20 -bottom-20" />

        <div className="relative z-10">

          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#B3CFE5] text-2xl">

            <FaBuilding />

          </div>

          <h2 className="text-white text-2xl md:text-3xl font-bold mt-6">

            Looking for a place to stay?

          </h2>

          <p className="text-[#B3CFE5] mt-3 max-w-md leading-7">

            Browse rooms, PGs, hostels, flats and apartments
            based on your preferred city and monthly budget.

          </p>

          <Link
            to="/findStay"
            className="inline-flex items-center gap-2 bg-white text-[#0A1931] px-5 py-3 rounded-xl font-bold mt-7 hover:-translate-y-1 transition-transform"
          >

            Explore Properties

            <FaArrowRight />

          </Link>

        </div>

      </div>

      {/* FIND ROOMMATE */}

      <div className="relative overflow-hidden bg-[#4A7FA7] rounded-3xl p-8 md:p-10 group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl rf-fade-up rf-delay-1">

        <div className="absolute w-60 h-60 bg-white/10 rounded-full blur-3xl -right-20 -top-20" />

        <div className="relative z-10">

          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white text-2xl">

            <FaUserFriends />

          </div>

          <h2 className="text-white text-2xl md:text-3xl font-bold mt-6">

            Searching for the right roommate?

          </h2>

          <p className="text-[#E4F1FA] mt-3 max-w-md leading-7">

            Discover roommate profiles and compare location,
            lifestyle preferences, occupation and monthly budget.

          </p>

          <Link
            to="/roomies"
            className="inline-flex items-center gap-2 bg-white text-[#0A1931] px-5 py-3 rounded-xl font-bold mt-7 hover:-translate-y-1 transition-transform"
          >

            Find Roommates

            <FaArrowRight />

          </Link>

        </div>

      </div>

    </div>

  </section>

  {/* ================================================= */}
  {/* FEATURED PROPERTIES */}
  {/* ================================================= */}

  <section className="max-w-7xl mx-auto px-5 pb-20">

    {/* SECTION HEADER */}

    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">

      <div>

        <p className="text-[#4A7FA7] font-bold text-sm uppercase tracking-[3px]">
          Discover Spaces
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1931] mt-2">
          Featured Properties
        </h2>

        <p className="text-gray-500 mt-3">
          Explore spaces designed for comfortable and convenient living.
        </p>

      </div>

      <Link
        to="/findStay"
        className="flex items-center gap-2 text-[#4A7FA7] font-bold hover:text-[#0A1931] transition"
      >

        View All Properties

        <FaArrowRight />

      </Link>

    </div>

    {/* PROPERTY GRID */}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

      {rooms.map((room) => (

        <div
          key={room.id}
          className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group rf-fade-up"
        >

          {/* IMAGE */}

          <div className="h-60 overflow-hidden relative">

            <img
              src={room.image}
              alt={room.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy"
            />

            {/* BADGE */}

            <span className="absolute top-4 left-4 bg-[#0A1931]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold">

              {room.badge}

            </span>

            {/* RATING */}

            <span className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">

              <FaStar className="text-yellow-500" />

              {room.rating}

            </span>

          </div>

          {/* CONTENT */}

          <div className="p-6">

            <h3 className="text-xl font-bold text-[#0A1931]">
              {room.title}
            </h3>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">

              <FaMapMarkerAlt className="text-[#4A7FA7]" />

              {room.location}

            </div>

            <div className="border-t border-gray-100 mt-5 pt-5 flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Monthly Rent
                </p>

                <div className="flex items-center text-[#0A1931] mt-1">

                  <FaRupeeSign />

                  <span className="text-xl font-extrabold">

                    {room.price.toLocaleString("en-IN")}

                  </span>

                  <span className="text-gray-400 text-xs ml-1">
                    /month
                  </span>

                </div>

              </div>

              <button
                onClick={() => navigate("/findStay")}
                className="w-11 h-11 bg-[#0A1931] hover:bg-[#4A7FA7] text-white rounded-xl flex items-center justify-center transition"
              >

                <FaArrowRight />

              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </section>

  {/* ================================================= */}
  {/* HOW IT WORKS */}
  {/* ================================================= */}

  <section className="bg-white py-20">

    <div className="max-w-7xl mx-auto px-5">

      <div className="text-center max-w-2xl mx-auto">

        <p className="text-[#4A7FA7] font-bold text-sm uppercase tracking-[3px]">
          Simple Process
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1931] mt-3">

          Finding Your Next Home is Easy

        </h2>

        <p className="text-gray-500 mt-4 leading-7">

          RoomFinder simplifies the process of discovering properties
          and compatible roommates.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

        {steps.map((step) => (

          <div
            key={step.id}
            className="relative bg-[#F4F8FB] rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 rf-fade-up"
          >

            <span className="absolute top-5 right-6 text-5xl font-black text-[#DCEAF4]">

              {step.id}

            </span>

            <div className="w-14 h-14 bg-[#0A1931] text-white rounded-2xl flex items-center justify-center text-xl">

              {step.icon}

            </div>

            <h3 className="text-xl font-bold text-[#0A1931] mt-6">

              {step.title}

            </h3>

            <p className="text-gray-500 leading-7 text-sm mt-3">

              {step.description}

            </p>

          </div>

        ))}

      </div>

    </div>

  </section>

  {/* ================================================= */}
  {/* WHY ROOMFINDER */}
  {/* ================================================= */}

  <section className="py-20 bg-[#F4F8FB]">

    <div className="max-w-7xl mx-auto px-5">

      <div className="text-center max-w-2xl mx-auto">

        <p className="text-[#4A7FA7] font-bold text-sm uppercase tracking-[3px]">
          Why RoomFinder
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1931] mt-3">

          A Better Way to Find Your Space

        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">

        {features.map((feature, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 rf-fade-up"
          >

            <div className="w-14 h-14 bg-[#EEF5FA] text-[#4A7FA7] rounded-2xl flex items-center justify-center text-2xl">

              {feature.icon}

            </div>

            <h3 className="text-xl font-bold text-[#0A1931] mt-6">

              {feature.title}

            </h3>

            <p className="text-gray-500 leading-7 text-sm mt-3">

              {feature.description}

            </p>

          </div>

        ))}

      </div>

    </div>

  </section>

  {/* ================================================= */}
  {/* TESTIMONIAL / TRUST SECTION */}
  {/* ================================================= */}

  {/* <section className="bg-white py-20">

    <div className="max-w-5xl mx-auto px-5">

      <div className="bg-[#0A1931] rounded-[35px] p-8 md:p-14 relative overflow-hidden">

        <div className="absolute w-72 h-72 bg-[#4A7FA7]/20 rounded-full blur-3xl -top-20 -right-20" />

        <div className="relative z-10 text-center">

          <div className="w-14 h-14 bg-white/10 text-[#B3CFE5] rounded-2xl mx-auto flex items-center justify-center text-xl">

            <FaQuoteLeft />

          </div>

          <h2 className="text-white text-2xl md:text-4xl font-extrabold mt-7 max-w-3xl mx-auto leading-tight">

            Find the right place and the right people to make it feel like home.

          </h2>

          <p className="text-[#B3CFE5] mt-5 max-w-2xl mx-auto leading-7">

            Whether you're moving for college, starting a new job or
            simply looking for a better living experience, RoomFinder
            helps you discover options that match your needs.

          </p>

        </div>

      </div>

    </div>

  </section> */}

  {/* ================================================= */}
  {/* FINAL CTA */}
  {/* ================================================= */}

  <section className="px-5 pb-20 bg-white">

    <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#4A7FA7] to-[#0A1931] rounded-[35px] shadow-xl hover:shadow-2xl transition-shadow duration-500 px-6 py-16 md:p-16 text-center relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl -top-20 -left-20" />

      <div className="relative z-10">

        <h2 className="text-white text-3xl md:text-5xl font-extrabold">

          Have a Space to Share?

        </h2>

        <p className="text-[#D9EAF5] max-w-2xl mx-auto mt-5 leading-7">

          Post your property or roommate profile and connect with
          people searching for their next perfect living space.

        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

          <Link
            to="/addProperty"
            className="w-full sm:w-auto bg-white text-[#0A1931] px-7 py-3.5 rounded-xl font-bold hover:-translate-y-1 transition-transform"
          >

            Post Property

          </Link>

          <Link
            to="/addRoommate"
            className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-7 py-3.5 rounded-xl font-bold hover:bg-white/20 transition"
          >

            Create Roommate Profile

          </Link>

        </div>

      </div>

    </div>

  </section>

    </div>
  </>
  );
}

export default Home;

