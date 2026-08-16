import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import roomieImg from "../images/roomieImg.jpg";

import {
  FaArrowLeft,
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaWallet,
  FaUserFriends,
  FaPhoneAlt,
  FaBirthdayCake,
  FaHeart,
  FaHome,
  FaShieldAlt,
  FaCheckCircle,
  FaSmoking,
  FaPaw,
  FaGlassCheers,
  FaLeaf,
  FaCalendarAlt,
} from "react-icons/fa";

const RoommateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoommateDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roommates/${id}`)

        if (response.data?.success) {
          setRoommate(response.data.data);
        } else {
          setRoommate(response.data?.data || null);
        }
      } catch (err) {
        console.error(
          "Error fetching roommate:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            "Failed to fetch roommate details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoommateDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#B3CFE5] border-t-[#0A1931] rounded-full animate-spin" />
        <p className="text-[#4A7FA7] mt-5 font-medium">
          Loading roommate profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <FaUserFriends className="text-5xl text-[#B3CFE5] mx-auto" />
          <h1 className="text-2xl font-bold text-[#0A1931] mt-5">
            Something went wrong
          </h1>
          <p className="text-gray-500 mt-2">{error}</p>
          <button
            onClick={() => navigate("/roomies")}
            className="mt-6 bg-[#0A1931] hover:bg-[#4A7FA7] text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Back to Roomies
          </button>
        </div>
      </div>
    );
  }

  if (!roommate) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex items-center justify-center px-5">
        <div className="text-center">
          <FaUserFriends className="text-6xl text-[#B3CFE5] mx-auto" />
          <h1 className="text-2xl font-bold text-[#0A1931] mt-5">
            Roommate Not Found
          </h1>
          <button
            onClick={() => navigate("/roomies")}
            className="mt-6 bg-[#0A1931] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4A7FA7] transition"
          >
            Back to Roomies
          </button>
        </div>
      </div>
    );
  }

  const city = roommate.preferredLocation?.city || "City not specified";
  const area = roommate.preferredLocation?.area || "Area not specified";
  const lifestyle = roommate.lifestyle || {};

  const phoneNumber = String(roommate.contactNumber || "").replace(
    /[^0-9+]/g,
    ""
  );

  const lifestyleItems = [
    {
      label: "Smoking",
      value: lifestyle.smoking ? "Yes" : "No",
      icon: <FaSmoking />,
      active: lifestyle.smoking,
    },
    {
      label: "Drinking",
      value: lifestyle.drinking ? "Yes" : "No",
      icon: <FaGlassCheers />,
      active: lifestyle.drinking,
    },
    {
      label: "Pets",
      value: lifestyle.pets ? "Yes" : "No",
      icon: <FaPaw />,
      active: lifestyle.pets,
    },
    {
      label: "Vegetarian",
      value: lifestyle.vegetarian ? "Yes" : "No",
      icon: <FaLeaf />,
      active: lifestyle.vegetarian,
    },
  ];

  const mapQuery = encodeURIComponent(
    `${area !== "Area not specified" ? `${area}, ` : ""}${city}`
  );

  return (
    <div className="min-h-screen bg-[#F4F8FB] text-[#0A1931] pb-16">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[430px] md:min-h-[475px] overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{ backgroundImage: `url(${roomieImg})` }}
        />

        {/* Same dark RoomFinder-style overlay */}
        <div className="absolute inset-0 bg-[#071A33]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/95 via-[#0A1931]/80 to-[#0A1931]/65" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 pt-8 md:pt-10 pb-12">

          <button
            onClick={() => navigate("/roomies")}
            className="inline-flex items-center gap-2 bg-[#071A33]/70 hover:bg-[#4A7FA7] border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Roomies
          </button>

          {/* HERO CONTENT */}
          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[230px_1fr_255px] items-center gap-7 md:gap-9">

            {/* BIG PROFILE IMAGE */}
            <div className="flex justify-center lg:justify-start">
              {roommate.profileImage ? (
                <img
                  src={roommate.profileImage}
                  alt={roommate.name}
                  className="w-52 h-52 md:w-56 md:h-56 object-cover rounded-[28px] border-4 border-white/80 shadow-2xl ring-4 ring-[#4A7FA7]/30 hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="w-52 h-52 md:w-56 md:h-56 bg-white/10 backdrop-blur-md border-4 border-white/30 rounded-[28px] flex items-center justify-center shadow-2xl">
                  <FaUser className="text-7xl text-[#B3CFE5]" />
                </div>
              )}
            </div>

            {/* PROFILE INFO */}
            <div className="text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-green-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  <FaCheckCircle />
                  {roommate.status || "Available"}
                </span>

                {roommate.gender && (
                  <span className="bg-white/15 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs font-semibold">
                    {roommate.gender}
                  </span>
                )}

                {roommate.occupation && (
                  <span className="bg-white/15 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs font-semibold">
                    {roommate.occupation}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {roommate.name}
              </h1>

              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-[#D7E5F1] text-sm">
                {roommate.gender && (
                  <span className="flex items-center gap-2">
                    <FaUser />
                    {roommate.gender}
                  </span>
                )}

                {roommate.age && (
                  <span className="flex items-center gap-2">
                    <FaBirthdayCake />
                    {roommate.age} Years
                  </span>
                )}

                <span className="flex items-center gap-2">
                  <FaUserFriends />
                  Looking for {roommate.preferredGender || "Anyone"}
                </span>
              </div>

              <div className="mt-5 flex items-start justify-center lg:justify-start gap-3 text-left">
                <FaMapMarkerAlt className="mt-1 text-xl text-[#8DB5D3]" />
                <div>
                  <p className="font-bold text-lg">{city}</p>
                  <p className="text-sm text-[#C6D7E5]">{area}</p>
                </div>
              </div>
            </div>

            {/* CONTACT CARD */}
            <div className="bg-white text-[#0A1931] rounded-3xl p-5 md:p-6 shadow-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#EAF3FA] flex items-center justify-center text-[#4A7FA7]">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Get in Touch</h3>
                  <p className="text-xs text-gray-400">
                    Contact this roommate
                  </p>
                </div>
              </div>

              <p className="font-bold text-lg tracking-wide mb-4">
                {roommate.contactNumber || "Not provided"}
              </p>

              {phoneNumber ? (
                <a
                  href={`tel:${phoneNumber}`}
                  className="w-full bg-[#4A7FA7] hover:bg-[#0A1931] active:scale-[0.98] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                >
                  <FaPhoneAlt />
                  Call {roommate.name}
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-bold cursor-not-allowed"
                >
                  No Contact Number
                </button>
              )}

              <p className="text-center text-xs text-gray-400 mt-3">
                Click the button above to call directly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-5 -mt-8 relative z-20">

        {/* QUICK OVERVIEW */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#4A7FA7] flex items-center justify-center">
              <FaUser />
            </div>
            <h2 className="text-xl font-bold">Quick Overview</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-3 md:px-5">
              <FaBriefcase className="text-[#4A7FA7] text-xl mb-3" />
              <p className="text-xs text-gray-400">Occupation</p>
              <p className="font-bold mt-1">
                {roommate.occupation || "Not specified"}
              </p>
            </div>

            <div className="p-3 md:px-5">
              <FaWallet className="text-[#4A7FA7] text-xl mb-3" />
              <p className="text-xs text-gray-400">Budget</p>
              <p className="font-bold mt-1">
                ₹{Number(roommate.budget || 0).toLocaleString("en-IN")} / month
              </p>
            </div>

            <div className="p-3 md:px-5">
              <FaUserFriends className="text-[#4A7FA7] text-xl mb-3" />
              <p className="text-xs text-gray-400">Preferred Gender</p>
              <p className="font-bold mt-1">
                {roommate.preferredGender || "Anyone"}
              </p>
            </div>

            <div className="p-3 md:px-5">
              <FaCalendarAlt className="text-[#4A7FA7] text-xl mb-3" />
              <p className="text-xs text-gray-400">Profile Status</p>
              <p className="font-bold mt-1">
                {roommate.status || "Available"}
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT + LIFESTYLE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#4A7FA7] flex items-center justify-center">
                <FaUser />
              </div>
              <h2 className="text-xl font-bold">About {roommate.name}</h2>
            </div>

            <p className="text-gray-600 leading-7 text-sm md:text-base">
              {roommate.bio || "No bio provided."}
            </p>
          </section>

          <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#4A7FA7] flex items-center justify-center">
                <FaHeart />
              </div>
              <h2 className="text-xl font-bold">Lifestyle</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {lifestyleItems.map((item) => (
                <div
                  key={item.label}
                  className="border border-gray-100 rounded-2xl p-4 flex items-center gap-3 bg-[#FAFCFE]"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.active
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      {item.label}
                    </p>
                    <p
                      className={`font-bold text-sm ${
                        item.active ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* LOCATION + CONTACT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#4A7FA7] flex items-center justify-center">
                <FaMapMarkerAlt />
              </div>
              <h2 className="text-xl font-bold">Preferred Location</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">City</p>
                <p className="font-bold mt-1">{city}</p>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4">
                <p className="text-xs text-gray-400">Area</p>
                <p className="font-bold mt-1">{area}</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#4A7FA7] flex items-center justify-center">
                <FaPhoneAlt />
              </div>
              <h2 className="text-xl font-bold">Contact Information</h2>
            </div>

            <p className="text-xs text-gray-400">Phone Number</p>

            {phoneNumber ? (
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-3 mt-2 text-[#4A7FA7] hover:text-[#0A1931] font-bold text-lg transition-colors"
              >
                <FaPhoneAlt />
                {roommate.contactNumber}
              </a>
            ) : (
              <p className="font-bold mt-2">Not provided</p>
            )}

            <p className="text-xs text-gray-400 mt-2">
              Click the number to call directly
            </p>
          </section>
        </div>

        {/* MAP */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 md:p-6 mt-6 overflow-hidden">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#EAF3FA] text-[#4A7FA7] flex items-center justify-center">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h2 className="text-xl font-bold">Location on Map</h2>
              <p className="text-xs text-gray-400">
                Approximate preferred location
              </p>
            </div>
          </div>

          <div className="w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden border border-gray-100 bg-[#F4F8FB]">
            <iframe
              title={`Map showing ${city}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* STAY SAFE */}
        <section className="mt-6 bg-[#EEF6FC] border border-[#D5E8F7] rounded-3xl p-6 md:p-7 flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-12 h-12 min-w-12 rounded-full bg-[#DCECF8] text-[#4A7FA7] flex items-center justify-center text-xl">
            <FaShieldAlt />
          </div>

          <div>
            <h2 className="font-bold text-lg">Stay Safe</h2>
            <p className="text-sm text-gray-600 mt-1 leading-6">
              We recommend connecting in public places and sharing your
              location with a friend when meeting for the first time.
            </p>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold">
            Interested in {roommate.name}?
          </h2>

          <p className="text-gray-500 mt-2">
            Connect and find your perfect living companion!
          </p>

          <button
            onClick={() => navigate("/roomies")}
            className="mt-6 w-full max-w-md mx-auto bg-[#0A1931] hover:bg-[#4A7FA7] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
          >
            <FaArrowLeft />
            Back to All Roommates
          </button>
        </section>
      </main>
    </div>
  );
};

export default RoommateDetails;

