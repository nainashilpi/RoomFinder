import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import roomieImg from "../images/roomieImg.jpg";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaUser,
  FaBriefcase,
  FaWallet,
  FaUserFriends,
  FaArrowRight,
  FaHeart,
  FaSlidersH,
  FaTimes,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

function Roomies() {
  const navigate = useNavigate();

  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

 useEffect(() => {
    const fetchRoommates = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/roommates`
        );

        if (response.data?.success) {
          setRoommates(response.data.data || []);
        } else {
          setRoommates(response.data?.data || []);
        }
      } catch (err) {
        console.error(
          "Error fetching roommates:",
          err.response?.data || err.message
        );

        setRoommates([]);
        setError(
          err.response?.data?.message ||
            "Could not connect to the server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoommates();
  }, []);

  const filteredRoommates = useMemo(() => {
    return roommates.filter((roommate) => {
      const searchValue = search.trim().toLowerCase();
      const city = roommate.preferredLocation?.city || "";
      const area = roommate.preferredLocation?.area || "";

      const matchesSearch =
        searchValue === "" ||
        roommate.name?.toLowerCase().includes(searchValue) ||
        city.toLowerCase().includes(searchValue) ||
        area.toLowerCase().includes(searchValue) ||
        roommate.bio?.toLowerCase().includes(searchValue);

      const matchesGender =
        gender === "" || roommate.gender === gender;

      const matchesOccupation =
        occupation === "" ||
        roommate.occupation === occupation;

      const matchesBudget =
        maxBudget === "" ||
        Number(roommate.budget || 0) <= Number(maxBudget);

      return (
        matchesSearch &&
        matchesGender &&
        matchesOccupation &&
        matchesBudget
      );
    });
  }, [roommates, search, gender, occupation, maxBudget]);

  const clearFilters = () => {
    setSearch("");
    setGender("");
    setOccupation("");
    setMaxBudget("");
  };

  const hasActiveFilters =
    search || gender || occupation || maxBudget;

  const getLifestyleItems = (lifestyle) => {
    if (!lifestyle) return [];

    const items = [];
    if (lifestyle.smoking) items.push("Smoking");
    if (lifestyle.drinking) items.push("Drinking");
    if (lifestyle.pets) items.push("Pets");
    if (lifestyle.vegetarian) items.push("Vegetarian");

    return items;
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB]">

      {/* HERO */}
      <section
        className="relative min-h-[440px] bg-cover bg-center flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${roomieImg})` }}
      >
        <div className="absolute inset-0 bg-[#0A1931]/85" />
        <div className="absolute w-[380px] h-[380px] bg-[#4A7FA7]/20 rounded-full blur-3xl -top-40 -right-32 animate-pulse" />
        <div className="absolute w-[280px] h-[280px] bg-[#4A7FA7]/10 rounded-full blur-3xl -bottom-40 -left-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-14 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div className="animate-[fadeUp_.7s_ease-out_both]">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-[#B3CFE5] px-4 py-2 rounded-full text-sm font-semibold">
                <FaUsers />
                Find People Who Feel Like Home
              </div>

              <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mt-6">
                Find the
                <span className="text-[#8DB5D3]"> Right Roommate.</span>
              </h1>

              <p className="text-[#B3CFE5] text-base md:text-lg leading-7 mt-5 max-w-xl">
                Discover compatible roommates based on location,
                lifestyle, profession and budget.
              </p>

              <div className="flex flex-wrap gap-5 mt-6 text-white text-sm">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#8DB5D3]" />
                  Lifestyle matching
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#8DB5D3]" />
                  Budget friendly
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#8DB5D3]" />
                  Easy connection
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 md:p-6 shadow-2xl animate-[fadeUp_.8s_.1s_ease-out_both]">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#4A7FA7] rounded-xl flex items-center justify-center text-white">
                  <FaSearch />
                </div>
                <div>
                  <h2 className="text-white font-bold">
                    Find a Roommate
                  </h2>
                  <p className="text-[#B3CFE5] text-xs mt-1">
                    Search by name, city or area
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-2 flex items-center shadow-xl">
                <FaMapMarkerAlt className="text-[#4A7FA7] ml-3" />

                <input
                  type="text"
                  value={search}
                  placeholder="Search name, city or area..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-3 text-gray-700 outline-none bg-transparent"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-gray-400 hover:text-gray-700 mr-3"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mt-5 text-sm">
                <span className="text-[#B3CFE5]">
                  <strong className="text-white text-lg">
                    {roommates.length}
                  </strong>{" "}
                  profiles available
                </span>

                <span className="text-[#8DB5D3] flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Find nearby
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT CTA */}
      <section className="max-w-7xl mx-auto px-5">
        <div className="relative -mt-7 z-20 bg-white shadow-lg rounded-2xl px-5 py-4 border border-gray-100 animate-[fadeUp_.7s_.2s_ease-out_both]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EEF5FA] rounded-xl flex items-center justify-center text-[#4A7FA7]">
                <FaUserFriends />
              </div>
              <div>
                <h3 className="font-bold text-[#0A1931] text-sm">
                  Find people, not just profiles
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  Compare lifestyle, location and budget.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/addRoommate")}
              className="bg-[#0A1931] hover:bg-[#4A7FA7] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
            >
              Create Profile
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-5 py-14">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[#4A7FA7] font-bold uppercase tracking-[2px] text-xs">
              Discover Your People
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1931] mt-2">
              Potential Roommates
            </h2>

            <p className="text-gray-500 mt-2 max-w-xl text-sm">
              Explore profiles and find someone whose lifestyle,
              location and budget match yours.
            </p>
          </div>

          <div className="bg-[#EEF5FA] text-[#4A7FA7] px-4 py-2 rounded-xl text-sm font-bold">
            {filteredRoommates.length} Profiles Found
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-7">

          <div className="flex items-center gap-2 mb-3">
            <FaSlidersH className="text-[#4A7FA7]" />
            <h3 className="font-bold text-[#0A1931] text-sm">
              Refine Matches
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">

            <div className="flex-[2] flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-[#4A7FA7] transition-colors">
              <FaSearch className="text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search profiles..."
                className="w-full px-3 py-3 outline-none text-sm"
              />
            </div>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7FA7]"
            >
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7FA7]"
            >
              <option value="">Any Occupation</option>
              <option value="Student">Student</option>
              <option value="Working Professional">
                Working Professional
              </option>
              <option value="Freelancer">Freelancer</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7FA7]"
            >
              <option value="">Any Budget</option>
              <option value="5000">Under ₹5,000</option>
              <option value="10000">Under ₹10,000</option>
              <option value="15000">Under ₹15,000</option>
              <option value="25000">Under ₹25,000</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="border border-red-100 bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition"
              >
                <FaTimes />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ERROR */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 mt-7 text-center font-semibold">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-[#B3CFE5] border-t-[#0A1931] rounded-full animate-spin" />
            <p className="text-gray-500 mt-4 text-sm">
              Finding compatible roommates...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredRoommates.length === 0 && (
          <div className="bg-white rounded-2xl text-center py-20 shadow-sm mt-8">
            <FaUserFriends className="text-5xl text-[#B3CFE5] mx-auto" />

            <h2 className="text-xl font-bold text-[#0A1931] mt-5">
              No Matching Profiles
            </h2>

            <p className="text-gray-500 mt-2">
              {error
                ? "Unable to load roommate profiles."
                : "Try changing your search preferences."}
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 bg-[#0A1931] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#4A7FA7] transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CARDS */}
        {!loading && filteredRoommates.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-8">

            {filteredRoommates.map((roommate, index) => {
              const lifestyleItems = getLifestyleItems(
                roommate.lifestyle
              );

              const city =
                roommate.preferredLocation?.city ||
                "City not specified";

              const area =
                roommate.preferredLocation?.area ||
                "Area not specified";

              return (
                <article
                  key={roommate._id}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="bg-white rounded-3xl border border-[#E5EDF3] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group animate-[fadeUp_.55s_ease-out_both]"
                >
                  <div className="flex flex-col sm:flex-row min-h-[300px]">

                    <div className="sm:w-[220px] lg:w-[235px] bg-gradient-to-br from-[#4A7FA7] to-[#0A1931] p-5 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                      <div className="absolute w-40 h-40 bg-white/10 rounded-full blur-3xl -top-16 -left-16" />
                      <div className="absolute w-28 h-28 bg-[#8DB5D3]/10 rounded-full blur-2xl -bottom-10 -right-10" />

                      <div className="relative">
                        {roommate.profileImage ? (
                          <img
                            src={roommate.profileImage}
                            alt={roommate.name}
                            className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-3xl border-4 border-white/30 shadow-2xl group-hover:scale-[1.04] transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center">
                            <FaUser className="text-5xl text-[#B3CFE5]" />
                          </div>
                        )}

                        <span className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-400 border-4 border-[#214A70] rounded-full shadow-lg" />
                      </div>

                      <span className="mt-4 inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm">
                        {roommate.status || "Available"}
                      </span>

                      <p className="text-white font-bold mt-3 text-center">
                        {roommate.gender || "Not specified"}
                      </p>

                      <p className="text-[#B3CFE5] text-xs mt-1">
                        {roommate.age
                          ? `${roommate.age} years old`
                          : "Age not specified"}
                      </p>
                    </div>

                    <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col">

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#0A1931] tracking-tight">
                            {roommate.name}
                          </h3>

                          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1.5">
                            <FaMapMarkerAlt className="text-[#4A7FA7]" />
                            <span>
                              {area}, {city}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="w-9 h-9 min-w-9 bg-[#F4F8FB] rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                        >
                          <FaHeart />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-[#F4F8FB] rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <FaBriefcase className="text-[#4A7FA7] text-sm" />
                            <p className="text-gray-400 text-xs">
                              Occupation
                            </p>
                          </div>

                          <p className="text-[#0A1931] font-bold text-sm mt-1.5 truncate">
                            {roommate.occupation || "Not specified"}
                          </p>
                        </div>

                        <div className="bg-[#F4F8FB] rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <FaWallet className="text-[#4A7FA7] text-sm" />
                            <p className="text-gray-400 text-xs">
                              Budget
                            </p>
                          </div>

                          <p className="text-[#0A1931] font-bold text-sm mt-1.5">
                            ₹
                            {Number(
                              roommate.budget || 0
                            ).toLocaleString("en-IN")}
                            /mo
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-500 text-sm leading-6 mt-4 line-clamp-2">
                        {roommate.bio || "No bio provided."}
                      </p>

                      {lifestyleItems.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {lifestyleItems
                            .slice(0, 3)
                            .map((item) => (
                              <span
                                key={item}
                                className="bg-[#EEF5FA] text-[#4A7FA7] px-3 py-1 rounded-full text-xs font-semibold"
                              >
                                {item}
                              </span>
                            ))}
                        </div>
                      )}

                      <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-gray-400 text-xs">
                            Looking for
                          </p>

                          <p className="text-[#0A1931] font-bold text-sm mt-1">
                            {roommate.preferredGender || "Anyone"}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            navigate(
                              `/roommate/${roommate._id}`
                            )
                          }
                          className="bg-[#0A1931] hover:bg-[#4A7FA7] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          View Profile
                          <FaArrowRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="bg-[#0A1931] rounded-3xl px-7 py-9 relative overflow-hidden">
          <div className="absolute w-64 h-64 bg-[#4A7FA7]/20 rounded-full blur-3xl -right-20 -top-24" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-[#8DB5D3] font-bold uppercase tracking-[2px] text-xs">
                Join The Community
              </p>

              <h2 className="text-white text-2xl md:text-3xl font-extrabold mt-2">
                Haven't Found Your Match Yet?
              </h2>

              <p className="text-[#B3CFE5] mt-2 max-w-2xl text-sm leading-6">
                Create your roommate profile and let compatible people
                discover you.
              </p>
            </div>

            <button
              onClick={() => navigate("/addRoommate")}
              className="bg-white text-[#0A1931] px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform whitespace-nowrap"
            >
              Create Profile
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Roomies;


