import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaHome,
  FaRupeeSign,
  FaUserFriends,
  FaWifi,
  FaSnowflake,
  FaParking,
  FaUtensils,
  FaBath,
  FaBolt,
  FaArrowRight,
  FaSlidersH,
  FaBed,
} from "react-icons/fa";

import {
  MdOutlineBedroomParent,
  MdClear,
  MdClose,
} from "react-icons/md";

function FindStay() {
  const navigate = useNavigate();

  // =========================
  // COMPONENT STATE
  // =========================

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FILTER STATE
  // =========================

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [gender, setGender] = useState("");
  const [maxRent, setMaxRent] = useState("");

  // =========================
  // FETCH REAL PROPERTIES
  // =========================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`)

        console.log("Properties from backend:", response.data);

        if (response.data?.success) {
          setProperties(response.data.data || []);
        } else {
          setProperties(response.data?.data || []);
        }
      } catch (error) {
        console.error(
          "Error fetching properties:",
          error.response?.data || error.message
        );

        setProperties([]);

        setError(
          error.response?.data?.message ||
            "Could not connect to the server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // =========================
  // FILTER PROPERTIES
  // =========================

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchValue = search.trim().toLowerCase();

      // -------------------------
      // LOCATION SEARCH
      // -------------------------

      const locationMatch =
        property.location?.area
          ?.toLowerCase()
          .includes(searchValue) ||
        property.location?.city
          ?.toLowerCase()
          .includes(searchValue) ||
        property.location?.state
          ?.toLowerCase()
          .includes(searchValue);

      // -------------------------
      // SEARCH MATCH
      // -------------------------

      const matchesSearch =
        searchValue === "" ||
        property.title
          ?.toLowerCase()
          .includes(searchValue) ||
        property.description
          ?.toLowerCase()
          .includes(searchValue) ||
        locationMatch;

      // -------------------------
      // PROPERTY TYPE
      // -------------------------

      const matchesPropertyType =
        propertyType === "" ||
        property.propertyType === propertyType;

      // -------------------------
      // GENDER
      // -------------------------

      const matchesGender =
        gender === "" ||
        property.genderPreference === gender ||
        property.genderPreference === "Anyone";

      // -------------------------
      // MAX RENT
      // -------------------------

      const matchesRent =
        maxRent === "" ||
        Number(property.rent) <= Number(maxRent);

      return (
        matchesSearch &&
        matchesPropertyType &&
        matchesGender &&
        matchesRent
      );
    });
  }, [
    properties,
    search,
    propertyType,
    gender,
    maxRent,
  ]);

  // =========================
  // AMENITY ICON
  // =========================

  const getAmenityIcon = (amenity) => {
    const icons = {
      WiFi: <FaWifi />,
      AC: <FaSnowflake />,
      Parking: <FaParking />,
      Food: <FaUtensils />,
      "Attached Bathroom": <FaBath />,
      "Power Backup": <FaBolt />,
      Furnished: <MdOutlineBedroomParent />,
      Kitchen: <FaHome />,
    };

    return icons[amenity] || <FaHome />;
  };

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setPropertyType("");
    setGender("");
    setMaxRent("");
  };

  // =========================
  // ANIMATION
  // =========================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans antialiased selection:bg-[#4A7FA7] selection:text-white">

      {/* ========================= */}
      {/* HERO SECTION */}
      {/* ========================= */}

      <section className="relative bg-gradient-to-b from-[#0A1931] to-[#15305B] text-white px-6 py-24 overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,127,167,0.2),transparent_60%)]" />

        <div className="max-w-7xl mx-auto text-center relative z-10">

          <motion.p
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-[#8DB5D3] font-bold text-xs uppercase tracking-[5px]"
          >
            Find Your Perfect Space
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="text-5xl md:text-7xl font-black mt-5 tracking-tighter leading-tight"
          >
            Find a Place That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DB5D3] to-white">
              Feels Like Home
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="text-slate-300 mt-5 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            Explore rooms, PGs, hostels and apartments
            tailored around your lifestyle and budget.
          </motion.p>

          {/* SEARCH */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="max-w-3xl mx-auto mt-12 bg-white/10 backdrop-blur-lg border border-white/15 rounded-full p-2 flex items-center shadow-2xl focus-within:border-white/30 transition-all duration-300"
          >
            <div className="p-3 bg-[#4A7FA7]/25 rounded-full text-[#8DB5D3]">
              <FaSearch className="text-xl" />
            </div>

            <input
              type="text"
              value={search}
              placeholder="Search by city, area, state or property name..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-5 py-4 text-white placeholder-slate-400 outline-none text-base md:text-lg font-medium"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="p-3 hover:bg-white/15 rounded-full text-slate-400 hover:text-white transition"
              >
                <MdClose size={20} />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <main className="max-w-7xl mx-auto px-6 py-16 -mt-10 relative z-20">

        {/* ========================= */}
        {/* FILTER SECTION */}
        {/* ========================= */}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-slate-100">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base tracking-wide uppercase border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-6">
              <FaSlidersH className="text-[#4A7FA7] text-lg" />
              <span>Filter Results</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">

              {/* PROPERTY TYPE */}

              <div className="space-y-1.5">

                <label className="text-sm font-semibold text-slate-600 px-1">
                  Property Type
                </label>

                <select
                  value={propertyType}
                  onChange={(e) =>
                    setPropertyType(e.target.value)
                  }
                  className="w-full bg-[#F4F6F9] border border-slate-200 rounded-xl p-4 text-base font-medium text-slate-800 appearance-none outline-none focus:border-[#4A7FA7] focus:bg-white transition"
                >
                  <option value="">All Types</option>
                  <option value="Room">Room</option>
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Flat">Flat</option>
                  <option value="Apartment">Apartment</option>
                </select>

              </div>

              {/* GENDER */}

              <div className="space-y-1.5">

                <label className="text-sm font-semibold text-slate-600 px-1">
                  Gender Preference
                </label>

                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                  className="w-full bg-[#F4F6F9] border border-slate-200 rounded-xl p-4 text-base font-medium text-slate-800 appearance-none outline-none focus:border-[#4A7FA7] focus:bg-white transition"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male Only</option>
                  <option value="Female">Female Only</option>
                  <option value="Anyone">
                    Mixed/Anyone
                  </option>
                </select>

              </div>

              {/* BUDGET */}

              <div className="space-y-1.5">

                <label className="text-sm font-semibold text-slate-600 px-1">
                  Maximum Budget
                </label>

                <select
                  value={maxRent}
                  onChange={(e) =>
                    setMaxRent(e.target.value)
                  }
                  className="w-full bg-[#F4F6F9] border border-slate-200 rounded-xl p-4 text-base font-medium text-slate-800 appearance-none outline-none focus:border-[#4A7FA7] focus:bg-white transition"
                >
                  <option value="">Any Budget</option>
                  <option value="5000">
                    Under ₹5,000
                  </option>
                  <option value="10000">
                    Under ₹10,000
                  </option>
                  <option value="15000">
                    Under ₹15,000
                  </option>
                  <option value="20000">
                    Under ₹20,000
                  </option>
                  <option value="25000">
                    Under ₹25,000
                  </option>
                  <option value="35000">
                    Under ₹35,000
                  </option>
                </select>

              </div>

            </div>

            {/* CLEAR */}

            {(search ||
              propertyType ||
              gender ||
              maxRent) && (
              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={clearFilters}
                className="text-base font-bold text-rose-500 hover:text-rose-600 px-6 py-3.5 rounded-xl bg-rose-50 hover:bg-rose-100 transition flex items-center gap-2.5 self-start lg:self-center"
              >
                <MdClear />
                Clear All
              </motion.button>
            )}

          </div>
        </div>

        {/* ========================= */}
        {/* RESULT HEADER */}
        {/* ========================= */}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">

          <div>

            <h2 className="text-3xl font-black text-[#0A1931]">
              Available Accommodations
            </h2>

            <p className="text-slate-500 text-lg mt-1 font-medium leading-relaxed">
              We found{" "}
              <span className="font-bold text-[#4A7FA7]">
                {filteredProperties.length}
              </span>{" "}
              properties matching your choices.
            </p>

          </div>

          {error && (
            <span className="text-rose-600 bg-rose-50 px-4 py-2 rounded-lg text-sm font-semibold">
              {error}
            </span>
          )}

        </div>

        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl h-[460px] p-6 shadow-sm border border-slate-100 space-y-4 animate-pulse"
              >
                <div className="h-56 bg-slate-200 rounded-2xl w-full" />

                <div className="h-7 bg-slate-200 rounded w-3/4" />

                <div className="h-5 bg-slate-200 rounded w-1/2" />

                <div className="space-y-2 pt-3">
                  <div className="h-5 bg-slate-200 rounded w-full" />
                  <div className="h-5 bg-slate-200 rounded w-5/6" />
                </div>

                <div className="h-12 bg-slate-200 rounded-xl w-full mt-6" />
              </div>
            ))}

          </div>
        )}

        {/* ========================= */}
        {/* EMPTY STATE */}
        {/* ========================= */}

        {!loading &&
          filteredProperties.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white rounded-3xl text-center py-24 px-8 shadow-2xl shadow-slate-100/50 border border-slate-100 max-w-2xl mx-auto"
            >

              <div className="w-24 h-24 bg-slate-50 text-[#4A7FA7] flex items-center justify-center rounded-full mx-auto mb-8 border border-slate-150">
                <FaHome size={42} />
              </div>

              <h2 className="text-3xl font-black text-[#0A1931]">
                No Properties Found
              </h2>

              <p className="text-slate-500 mt-3 text-lg max-w-md mx-auto leading-relaxed font-medium">
                There are currently no properties matching
                your selected filters.
              </p>

              {(search ||
                propertyType ||
                gender ||
                maxRent) && (
                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={clearFilters}
                  className="mt-9 bg-[#0A1931] hover:bg-[#15305B] text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-colors"
                >
                  Reset Filters
                </motion.button>
              )}

            </motion.div>
          )}

        {/* ========================= */}
        {/* PROPERTY CARDS */}
        {/* ========================= */}

        {!loading &&
          filteredProperties.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >

              <AnimatePresence>

                {filteredProperties.map((property) => (

                  <motion.div
                    key={property._id}
                    variants={cardVariants}
                    layout
                    whileHover={{
                      y: -10,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                  >

                    {/* IMAGE */}

                    <div className="h-56 bg-gradient-to-br from-[#4A7FA7] to-[#0A1931] relative overflow-hidden">

                      {property.images?.length > 0 ? (

                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />

                      ) : (

                        <div className="w-full h-full flex flex-col items-center justify-center text-white/90">

                          <FaHome className="text-5xl opacity-40 mb-3" />

                          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">
                            Preview Pending
                          </p>

                        </div>

                      )}

                      {/* PROPERTY TYPE */}

                      <span className="absolute top-5 left-5 bg-white text-[#0A1931] px-4 py-2 rounded-full text-xs font-black tracking-wide uppercase shadow-lg">
                        {property.propertyType}
                      </span>

                      {/* IMAGE COUNT */}

                      {property.images?.length > 1 && (
                        <span className="absolute top-5 right-5 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                          {property.images.length} photos
                        </span>
                      )}

                    </div>

                    {/* CARD CONTENT */}

                    <div className="p-7 flex-1 flex flex-col justify-between">

                      <div>

                        {/* TITLE */}

                        <h2 className="text-2xl font-bold text-[#0A1931] line-clamp-1 group-hover:text-[#4A7FA7] transition-colors leading-tight">
                          {property.title}
                        </h2>

                        {/* LOCATION */}

                        <div className="flex items-center gap-2.5 text-slate-500 text-sm font-semibold mt-2.5">

                          <FaMapMarkerAlt className="text-[#4A7FA7]" />

                          <span className="truncate">

                            {property.location?.area &&
                              `${property.location.area}, `}

                            {property.location?.city ||
                              "Location Pending"}

                          </span>

                        </div>

                        {/* DESCRIPTION */}

                        <p className="text-slate-600 text-base mt-4 line-clamp-2 min-h-[48px] font-medium leading-relaxed">
                          {property.description}
                        </p>

                        {/* ROOM + GENDER */}

                        <div className="flex gap-5 mt-5 py-2.5 border-y border-slate-100 text-xs font-bold text-slate-700">

                          <div className="flex items-center gap-2 bg-[#F4F6F9] px-3.5 py-2 rounded-full">
                            <FaBed className="text-[#4A7FA7]" />
                            <span>
                              {property.roomType}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 bg-[#F4F6F9] px-3.5 py-2 rounded-full">
                            <FaUserFriends className="text-[#4A7FA7]" />
                            <span>
                              {property.genderPreference ||
                                "Anyone"}
                            </span>
                          </div>

                        </div>

                        {/* AMENITIES */}

                        {property.amenities?.length > 0 && (

                          <div className="flex items-center gap-2 mt-5 flex-wrap">

                            {property.amenities
                              .slice(0, 4)
                              .map((amenity) => (

                                <span
                                  key={amenity}
                                  title={amenity}
                                  className="bg-[#EEF5FA] hover:bg-[#D5E3EE] text-[#4A7FA7] p-3 rounded-full transition-colors text-base border border-[#C6D6E1]"
                                >
                                  {getAmenityIcon(amenity)}
                                </span>

                              ))}

                            {property.amenities.length > 4 && (

                              <span className="bg-[#EEF5FA] text-slate-700 font-bold px-3 py-2.5 rounded-full text-xs border border-[#C6D6E1]">
                                +{property.amenities.length - 4}
                              </span>

                            )}

                          </div>

                        )}

                      </div>

                      {/* PRICE + DETAILS */}

                      <div className="border-t border-slate-100 mt-7 pt-5 flex items-center justify-between">

                        {/* PRICE */}

                        <div>

                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Monthly Rent
                          </p>

                          <div className="flex items-baseline text-[#0A1931]">

                            <FaRupeeSign className="text-base font-bold" />

                            <span className="text-3xl font-black tracking-tight">
                              {Number(
                                property.rent || 0
                              ).toLocaleString("en-IN")}
                            </span>

                            <span className="text-slate-400 text-sm font-medium ml-1">
                              /mo
                            </span>

                          </div>

                        </div>

                        {/* VIEW DETAILS */}

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          onClick={() =>
                            navigate(
                              `/property/${property._id}`
                            )
                          }
                          className="bg-[#0A1931] hover:bg-[#15305B] text-white px-5 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2.5 shadow-lg shadow-[#0A1931]/10 transition-colors"
                        >
                          <span>View Details</span>

                          <FaArrowRight className="text-xs" />
                        </motion.button>

                      </div>

                    </div>

                  </motion.div>

                ))}

              </AnimatePresence>

            </motion.div>
          )}

      </main>
    </div>
  );
}

export default FindStay;