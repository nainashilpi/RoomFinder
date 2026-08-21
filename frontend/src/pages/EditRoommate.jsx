import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaPhoneAlt,
  FaCheck,
  FaSmoking,
  FaWineGlassAlt,
  FaPaw,
  FaLeaf,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditRoommate() {
  const navigate = useNavigate();
  const { id } = useParams();

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
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const lifestyleOptions = [
    { name: "Smoking", icon: <FaSmoking /> },
    { name: "Drinking", icon: <FaWineGlassAlt /> },
    { name: "Pets", icon: <FaPaw /> },
    { name: "Vegetarian", icon: <FaLeaf /> },
  ];

  // =====================================================
  // FETCH EXISTING ROOMMATE DATA
  // =====================================================

  useEffect(() => {
    const fetchRoommate = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/api/roommates/${id}`
        );

        const r = response.data.data;

        const lifestyleArr = [];
        if (r.lifestyle?.smoking) lifestyleArr.push("Smoking");
        if (r.lifestyle?.drinking) lifestyleArr.push("Drinking");
        if (r.lifestyle?.pets) lifestyleArr.push("Pets");
        if (r.lifestyle?.vegetarian) lifestyleArr.push("Vegetarian");

        setFormData({
          name: r.name || "",
          age: r.age || "",
          gender: r.gender || "",
          occupation: r.occupation || "",
          bio: r.bio || "",
          budget: r.budget || "",
          city: r.preferredLocation?.city || "",
          area: r.preferredLocation?.area || "",
          preferredGender: r.preferredGender || "Anyone",
          lifestyle: lifestyleArr,
          contactNumber: r.contactNumber || "",
        });
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load roommate data.");
        navigate("/roomies");
      } finally {
        setLoading(false);
      }
    };

    fetchRoommate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  // =====================================================
  // SUBMIT UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.age || Number(formData.age) < 18) {
      toast.error("Age must be 18 or above.");
      return;
    }

    if (
      formData.contactNumber &&
      !/^[0-9]{10}$/.test(formData.contactNumber)
    ) {
      toast.error("Please enter a valid 10-digit contact number.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      const updateData = {
        name: formData.name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        occupation: formData.occupation,
        bio: formData.bio.trim(),
        budget: Number(formData.budget),
        preferredLocation: {
          city: formData.city.trim(),
          area: formData.area.trim(),
        },
        preferredGender: formData.preferredGender,
        lifestyle: {
          smoking: formData.lifestyle.includes("Smoking"),
          drinking: formData.lifestyle.includes("Drinking"),
          pets: formData.lifestyle.includes("Pets"),
          vegetarian: formData.lifestyle.includes("Vegetarian"),
        },
        contactNumber: formData.contactNumber,
      };

      await axios.put(
        `${API_BASE_URL}/api/roommates/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Roommate profile updated successfully! 🎉");

      setTimeout(() => {
        navigate(`/roommate/${id}`);
      }, 800);
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update roommate profile."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#B3CFE5] border-t-[#0A1931] rounded-full animate-spin" />
        <p className="text-[#4A7FA7] mt-5 font-medium">
          Loading roommate data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F8FB] py-8 px-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#4A7FA7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] bg-[#0A1931]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* HEADER */}
          <div className="px-6 md:px-10 pt-8 pb-7 border-b border-gray-100 relative overflow-hidden">
            <div className="absolute -top-24 -right-20 w-56 h-56 rounded-full bg-[#4A7FA7]/10 blur-3xl" />

            <div className="relative z-10">
              <button
                onClick={() => navigate(`/roommate/${id}`)}
                className="flex items-center gap-2 text-[#4A7FA7] hover:text-[#0A1931] transition mb-5 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold">
                  Back to Profile
                </span>
              </button>

              <div className="inline-flex items-center gap-2 bg-[#EEF5FA] text-[#4A7FA7] px-3.5 py-2 rounded-full text-xs font-bold">
                <FaUser />
                Edit Roommate Profile
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#0A1931] mt-4">
                Update Your Profile
              </h1>

              <p className="text-gray-500 mt-2 text-sm md:text-base max-w-2xl leading-6">
                Update your roommate profile details below.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-10 space-y-7"
          >
            {/* BASIC INFO */}
            <section>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  01
                </span>
                <h2 className="text-xl font-bold text-[#0A1931]">
                  Basic Information
                </h2>
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
                    <option value="">Select</option>
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
                  className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 resize-none transition-all"
                />
              </div>
            </section>

            {/* BUDGET + LOCATION */}
            <section>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  02
                </span>
                <h2 className="text-xl font-bold text-[#0A1931]">
                  Budget & Location
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Monthly Budget (₹)
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
                    className="w-full px-4 py-3 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* LIFESTYLE */}
            <section>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  03
                </span>
                <h2 className="text-xl font-bold text-[#0A1931]">
                  Lifestyle
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {lifestyleOptions.map((item) => {
                  const selected = formData.lifestyle.includes(
                    item.name
                  );
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleLifestyle(item.name)}
                      className={`flex items-center gap-2 p-3.5 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                        selected
                          ? "bg-[#EEF5FA] text-[#4A7FA7] border-[#4A7FA7] shadow-sm"
                          : "bg-white text-[#0A1931] border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB]"
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
            <section>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  04
                </span>
                <h2 className="text-xl font-bold text-[#0A1931]">
                  Contact
                </h2>
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
                  className="w-full px-4 py-3 pl-10 border border-[#B3CFE5] rounded-xl outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                />
              </div>
            </section>

            {/* SUBMIT */}
            <section className="pt-1">
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
                    Updating Profile...
                  </span>
                ) : (
                  "Update Roommate Profile"
                )}
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRoommate;