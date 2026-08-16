import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaCamera,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaPhoneAlt,
  FaCheck,
  FaSmoking,
  FaWineGlassAlt,
  FaPaw,
  FaLeaf,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddRoommate() {
  const navigate = useNavigate();

  // Production: set VITE_API_URL in frontend .env
  // Example: VITE_API_URL=https://your-backend.onrender.com
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    bio: "",
    budget: "",
    city: "",
    area: "",
    preferredGender: "Anyone",
    lifestyle: [],
    contactNumber: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLifestyle = (value) => {
    setFormData((prev) => {
      const exists = prev.lifestyle.includes(value);

      return {
        ...prev,
        lifestyle: exists
          ? prev.lifestyle.filter((item) => item !== value)
          : [...prev.lifestyle, value],
      };
    });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }

    if (!formData.age || Number(formData.age) < 18) {
      toast.error("Age must be 18 or above.");
      return false;
    }

    if (!formData.gender) {
      toast.error("Please select gender.");
      return false;
    }

    if (!formData.occupation) {
      toast.error("Please select occupation.");
      return false;
    }

    if (!formData.bio.trim()) {
      toast.error("Please add a short bio.");
      return false;
    }

    if (!formData.budget || Number(formData.budget) < 0) {
      toast.error("Please enter a valid monthly budget.");
      return false;
    }

    if (!formData.city.trim()) {
      toast.error("Please enter your preferred city.");
      return false;
    }

    if (!formData.contactNumber.trim()) {
      toast.error("Please enter your contact number.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      toast.error("Please enter a valid 10-digit contact number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("age", formData.age);
      data.append("gender", formData.gender);
      data.append("occupation", formData.occupation);
      data.append("bio", formData.bio.trim());
      data.append("budget", formData.budget);

      data.append(
        "preferredLocation",
        JSON.stringify({
          city: formData.city.trim(),
          area: formData.area.trim(),
        })
      );

      data.append("preferredGender", formData.preferredGender);

      data.append(
        "lifestyle",
        JSON.stringify({
          smoking: formData.lifestyle.includes("Smoking"),
          drinking: formData.lifestyle.includes("Drinking"),
          pets: formData.lifestyle.includes("Pets"),
          vegetarian: formData.lifestyle.includes("Vegetarian"),
        })
      );

      data.append("contactNumber", formData.contactNumber);

      // Single profile image — backend field remains profileImage.
      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/roommates`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Roommate created:", response.data);

      toast.success("Roommate profile created successfully! 🎉");

      setTimeout(() => {
        navigate("/roomies");
      }, 800);
    } catch (error) {
      console.error(
        "CREATE ROOMMATE ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create roommate profile"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const lifestyleOptions = [
    {
      name: "Smoking",
      icon: <FaSmoking />,
    },
    {
      name: "Drinking",
      icon: <FaWineGlassAlt />,
    },
    {
      name: "Pets",
      icon: <FaPaw />,
    },
    {
      name: "Vegetarian",
      icon: <FaLeaf />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FB] py-8 px-4 relative overflow-hidden">
      <style>{`
        @keyframes rfFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rfGlow {
          0%, 100% {
            transform: scale(1);
            opacity: .14;
          }
          50% {
            transform: scale(1.08);
            opacity: .23;
          }
        }

        .rf-fade-up {
          animation: rfFadeUp .6s cubic-bezier(.22,1,.36,1) both;
        }

        .rf-delay-1 {
          animation-delay: .08s;
        }

        .rf-delay-2 {
          animation-delay: .16s;
        }

        .rf-delay-3 {
          animation-delay: .24s;
        }

        .rf-glow {
          animation: rfGlow 6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .rf-fade-up,
          .rf-glow {
            animation: none !important;
          }
        }
      `}</style>

      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#4A7FA7]/20 blur-3xl rf-glow pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-[#0A1931]/10 blur-3xl rf-glow pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 rf-fade-up">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="px-6 md:px-10 pt-8 pb-7 border-b border-gray-100 relative overflow-hidden">
            <div className="absolute -top-24 -right-20 w-56 h-56 rounded-full bg-[#4A7FA7]/10 blur-3xl rf-glow" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#EEF5FA] text-[#4A7FA7] px-3.5 py-2 rounded-full text-xs font-bold">
                <FaUser />
                RoomFinder Roommate Profile
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#0A1931] mt-4">
                Find Your Perfect Roommate
              </h1>

              <p className="text-gray-500 mt-2 text-sm md:text-base max-w-2xl leading-6">
                Create your profile and connect with people
                looking for a compatible roommate.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-10 space-y-7"
          >

            {/* PROFILE IMAGE */}
            <section className="rf-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold">
                  <FaCamera />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#0A1931]">
                    Profile Image
                  </h2>
                  <p className="text-xs text-gray-400">
                    Add one clear photo so people can recognize you
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 bg-[#F8FBFD] border border-gray-100 rounded-2xl p-5">
                <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden bg-[#EAF2F8] border border-[#B3CFE5] flex items-center justify-center shadow-sm">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="text-center">
                      <FaUser className="mx-auto text-3xl text-[#B3CFE5] mb-2" />
                      <span className="text-xs text-gray-400">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center sm:text-left">
                  <label
                    htmlFor="profileImage"
                    className="inline-flex items-center gap-2 bg-[#4A7FA7] hover:bg-[#0A1931] text-white px-5 py-3 rounded-xl cursor-pointer font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <FaCamera />
                    {previewImage ? "Change Image" : "Choose Image"}
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImage}
                    className="hidden"
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    JPG, PNG or WEBP • Max 5MB
                  </p>
                </div>
              </div>
            </section>

            {/* BASIC INFO */}
            <section className="rf-fade-up rf-delay-1">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  01
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Basic Information
                  </h2>
                  <p className="text-xs text-gray-400">
                    Tell people a little about yourself
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Name
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    placeholder="Enter age"
                    className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Occupation
                  </label>

                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all bg-white"
                  >
                    <option value="">Select Occupation</option>
                    <option value="Student">Student</option>
                    <option value="Working Professional">
                      Working Professional
                    </option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Tell people about yourself, your routine and what kind of roommate you are..."
                  className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 resize-none transition-all"
                />
              </div>
            </section>

            {/* BUDGET + LOCATION */}
            <section className="rf-fade-up rf-delay-2">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  02
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Budget & Location
                  </h2>
                  <p className="text-xs text-gray-400">
                    Where and within what budget are you looking?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Monthly Budget
                  </label>

                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-4 text-gray-400 text-xs" />

                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      min="0"
                      placeholder="e.g. 8000"
                      className="w-full px-4 py-3 pl-9 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Preferred Roommate Gender
                  </label>

                  <select
                    name="preferredGender"
                    value={formData.preferredGender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all bg-white"
                  >
                    <option value="Anyone">Anyone</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    City
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute right-4 top-4 text-gray-400 text-xs" />

                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Bhopal"
                      className="w-full px-4 py-3 pr-9 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Area
                  </label>

                  <input
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. MP Nagar"
                    className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* LIFESTYLE */}
            <section className="rf-fade-up">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  03
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Lifestyle
                  </h2>
                  <p className="text-xs text-gray-400">
                    Select what matches your lifestyle
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {lifestyleOptions.map((item) => {
                  const selected =
                    formData.lifestyle.includes(item.name);

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleLifestyle(item.name)}
                      className={`flex items-center gap-2 p-3.5 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                        selected
                          ? "bg-[#EEF5FA] text-[#4A7FA7] border-[#4A7FA7] shadow-sm -translate-y-0.5"
                          : "bg-white text-[#0A1931] border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB] hover:-translate-y-0.5"
                      }`}
                    >
                      <span
                        className={
                          selected
                            ? "text-[#4A7FA7]"
                            : "text-gray-400"
                        }
                      >
                        {item.icon}
                      </span>

                      {item.name}

                      {selected && (
                        <FaCheck className="ml-auto text-[10px]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* CONTACT */}
            <section className="rf-fade-up">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  04
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Contact
                  </h2>
                  <p className="text-xs text-gray-400">
                    Let interested people contact you
                  </p>
                </div>
              </div>

              <div className="relative">
                <FaPhoneAlt className="absolute left-4 top-4 text-gray-400 text-xs" />

                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  maxLength="10"
                  placeholder="10-digit contact number"
                  className="w-full px-4 py-3 pl-10 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                />
              </div>
            </section>

            {/* SUBMIT */}
            <section className="pt-1 rf-fade-up">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full text-white py-4 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0A1931] hover:bg-[#4A7FA7] hover:-translate-y-0.5 hover:shadow-xl"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Creating Profile...
                  </span>
                ) : (
                  "Create Roommate Profile"
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                Your profile will appear in Roomies after publishing.
              </p>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRoommate;

