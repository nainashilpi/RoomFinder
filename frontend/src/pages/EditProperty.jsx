import React, { useEffect, useState } from "react";
import {
  FaWifi,
  FaSnowflake,
  FaParking,
  FaUtensils,
  FaBath,
  FaBolt,
  FaBuilding,
  FaHome,
  FaHotel,
  FaBed,
  FaUserFriends,
  FaUsers,
  FaCalendarAlt,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCheck,
  FaArrowLeft,
} from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    roomType: "",
    rent: "",
    securityDeposit: "",
    availableFrom: "",
    genderPreference: "",
    furnishing: "",
    state: "",
    city: "",
    area: "",
    address: "",
    contactNumber: "",
    amenities: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const amenityList = [
    { name: "WiFi", icon: <FaWifi /> },
    { name: "AC", icon: <FaSnowflake /> },
    { name: "Parking", icon: <FaParking /> },
    { name: "Food", icon: <FaUtensils /> },
    { name: "Attached Bathroom", icon: <FaBath /> },
    { name: "Power Backup", icon: <FaBolt /> },
    { name: "Furnished", icon: <MdOutlineBedroomParent /> },
  ];

  const propertyTypes = [
    { name: "Room", icon: <FaBed /> },
    { name: "PG", icon: <FaBuilding /> },
    { name: "Hostel", icon: <FaHotel /> },
    { name: "Flat", icon: <FaHome /> },
    { name: "Apartment", icon: <FaBuilding /> },
  ];

  const roomTypes = [
    { name: "Single", icon: <FaBed /> },
    { name: "Double Sharing", icon: <FaUserFriends /> },
    { name: "Triple Sharing", icon: <FaUsers /> },
  ];

  // =====================================================
  // FETCH EXISTING PROPERTY DATA
  // =====================================================

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/api/properties/${id}`
        );

        const p = response.data.data;

        setFormData({
          title: p.title || "",
          description: p.description || "",
          propertyType: p.propertyType || "",
          roomType: p.roomType || "",
          rent: p.rent || "",
          securityDeposit: p.securityDeposit || "",
          availableFrom: p.availableFrom
            ? new Date(p.availableFrom).toISOString().split("T")[0]
            : "",
          genderPreference: p.genderPreference || "",
          furnishing: p.furnishing || "",
          state: p.location?.state || "",
          city: p.location?.city || "",
          area: p.location?.area || "",
          address: p.location?.address || "",
          contactNumber: p.contactNumber || "",
          amenities: p.amenities || [],
        });
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load property data.");
        navigate("/findStay");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAmenity = (item) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(item);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== item)
          : [...prev.amenities, item],
      };
    });
  };

  // =====================================================
  // SUBMIT UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a property title.");
      return;
    }

    if (!formData.rent || Number(formData.rent) < 0) {
      toast.error("Please enter a valid monthly rent.");
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
        title: formData.title.trim(),
        description: formData.description.trim(),
        propertyType: formData.propertyType,
        roomType: formData.roomType,
        rent: Number(formData.rent),
        securityDeposit: Number(formData.securityDeposit) || 0,
        availableFrom: formData.availableFrom || undefined,
        genderPreference: formData.genderPreference,
        furnishing: formData.furnishing,
        contactNumber: formData.contactNumber,
        amenities: formData.amenities,
        location: {
          state: formData.state,
          city: formData.city,
          area: formData.area,
          address: formData.address,
        },
      };

      await axios.put(
        `${API_BASE_URL}/api/properties/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Property updated successfully! 🎉");

      setTimeout(() => {
        navigate(`/property/${id}`);
      }, 800);
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to update property."
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
          Loading property data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F8FB] py-10 px-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#4A7FA7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] bg-[#0A1931]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* HEADER */}
          <div className="bg-[#0A1931] text-white px-6 md:px-10 py-10 relative overflow-hidden">
            <div className="absolute -top-20 -right-16 w-60 h-60 bg-[#4A7FA7]/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <button
                onClick={() => navigate(`/property/${id}`)}
                className="flex items-center gap-2 text-[#B3CFE5] hover:text-white transition mb-5 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold">
                  Back to Property
                </span>
              </button>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-[#B3CFE5] px-4 py-2 rounded-full text-xs font-semibold">
                <FaHome />
                Edit Property Listing
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold mt-5">
                Update Your Property
              </h1>

              <p className="text-[#B3CFE5] mt-2 max-w-2xl text-sm md:text-base leading-6">
                Update your property details below. Images cannot be
                changed during edit.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-9">
            {/* PROPERTY INFORMATION */}
            <section>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  01
                </span>
                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Property Information
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Update your property details
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Property Listing Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-3">
                    Property Type
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {propertyTypes.map((type) => {
                      const selected =
                        formData.propertyType === type.name;
                      return (
                        <button
                          key={type.name}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              propertyType: type.name,
                            }))
                          }
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                            selected
                              ? "bg-[#0A1931] text-white border-[#0A1931] shadow-md"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB]"
                          }`}
                        >
                          {selected && (
                            <FaCheck className="text-[10px]" />
                          )}
                          {type.icon}
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-3">
                    Room Type
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {roomTypes.map((type) => {
                      const selected =
                        formData.roomType === type.name;
                      return (
                        <button
                          key={type.name}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              roomType: type.name,
                            }))
                          }
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                            selected
                              ? "bg-[#4A7FA7] text-white border-[#4A7FA7] shadow-md"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB]"
                          }`}
                        >
                          {selected && (
                            <FaCheck className="text-[10px]" />
                          )}
                          {type.icon}
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all resize-none"
                  />
                </div>
              </div>
            </section>

            {/* PRICING */}
            <section>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  02
                </span>
                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Pricing & Availability
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Monthly Rent (₹)
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-4 text-gray-400 text-xs" />
                    <input
                      name="rent"
                      type="number"
                      min="0"
                      required
                      value={formData.rent}
                      onChange={handleChange}
                      className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 pl-9 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Security Deposit (₹)
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-4 text-gray-400 text-xs" />
                    <input
                      name="securityDeposit"
                      type="number"
                      min="0"
                      value={formData.securityDeposit}
                      onChange={handleChange}
                      className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 pl-9 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-2">
                    Available From
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-4 text-gray-400 text-xs pointer-events-none" />
                    <input
                      type="date"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleChange}
                      className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 pl-10 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* LOCATION */}
            <section>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  03
                </span>
                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Location Details
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["state", "State"],
                  ["city", "City"],
                  ["area", "Area / Landmark"],
                ].map(([name, placeholder]) => (
                  <input
                    key={name}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  />
                ))}

                <div className="relative">
                  <FaMapMarkerAlt className="absolute right-4 top-4 text-gray-400 text-xs pointer-events-none" />
                  <input
                    name="address"
                    placeholder="Full Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 pr-9 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* PREFERENCES */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#F4F8FB] rounded-2xl p-5">
                  <h2 className="text-lg font-bold text-[#0A1931] mb-3">
                    Gender Preference
                  </h2>
                  <select
                    name="genderPreference"
                    value={formData.genderPreference}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] bg-white rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Anyone">Anyone</option>
                  </select>
                </div>

                <div className="bg-[#F4F8FB] rounded-2xl p-5">
                  <h2 className="text-lg font-bold text-[#0A1931] mb-3">
                    Furnishing Status
                  </h2>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] bg-white rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </section>

            {/* AMENITIES */}
            <section>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  04
                </span>
                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Amenities
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {amenityList.map((item) => {
                  const selected = formData.amenities.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleAmenity(item.name)}
                      className={`flex items-center gap-2 p-3.5 rounded-xl border text-xs font-semibold text-left transition-all duration-300 ${
                        selected
                          ? "bg-[#EEF5FA] text-[#4A7FA7] border-[#4A7FA7] shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB]"
                      }`}
                    >
                      <span
                        className={
                          selected ? "text-[#4A7FA7]" : "text-gray-400"
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0A1931]">
                    Contact Number
                  </h2>
                </div>
              </div>

              <input
                name="contactNumber"
                type="tel"
                inputMode="numeric"
                maxLength="10"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
              />
            </section>

            {/* SUBMIT */}
            <section className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full text-white py-4 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0A1931] hover:bg-[#4A7FA7] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Updating Property...
                  </span>
                ) : (
                  "Update Property"
                )}
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;