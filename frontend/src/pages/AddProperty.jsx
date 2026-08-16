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
  FaCloudUploadAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddProperty() {
  const navigate = useNavigate();

  // Production: add VITE_API_URL to frontend .env
  // Example: VITE_API_URL=https://your-backend.onrender.com
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

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

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

  // IMPORTANT:
  // Selecting more images later now APPENDS them instead of replacing
  // the previously selected images.
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    const invalidFile = selectedFiles.find(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFile) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (oversizedFile) {
      toast.error("Each image must be smaller than 5MB.");
      e.target.value = "";
      return;
    }

    setImages((prev) => {
      const combined = [...prev];

      selectedFiles.forEach((file) => {
        const duplicate = combined.some(
          (oldFile) =>
            oldFile.name === file.name &&
            oldFile.size === file.size &&
            oldFile.lastModified === file.lastModified
        );

        if (!duplicate) {
          combined.push(file);
        }
      });

      if (combined.length > 5) {
        toast.error("You can upload maximum 5 images.");
        return combined.slice(0, 5);
      }

      return combined;
    });

    e.target.value = "";
  };

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.propertyType) {
      toast.error("Please select a property type.");
      return;
    }

    if (!formData.roomType) {
      toast.error("Please select a room type.");
      return;
    }

    if (!formData.genderPreference) {
      toast.error("Please select gender preference.");
      return;
    }

    if (!formData.furnishing) {
      toast.error("Please select furnishing status.");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Please enter a property title.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a property description.");
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
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("propertyType", formData.propertyType);
      data.append("roomType", formData.roomType);
      data.append("rent", formData.rent);
      data.append("securityDeposit", formData.securityDeposit || "0");
      data.append("availableFrom", formData.availableFrom);
      data.append("genderPreference", formData.genderPreference);
      data.append("furnishing", formData.furnishing);
      data.append("contactNumber", formData.contactNumber);

      data.append(
        "location",
        JSON.stringify({
          state: formData.state,
          city: formData.city,
          area: formData.area,
          address: formData.address,
        })
      );

      data.append("amenities", JSON.stringify(formData.amenities));

      // All selected images are sent using the SAME "images" field.
      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/properties`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Property created:", response.data);

      toast.success("Property posted successfully! 🎉");

      setTimeout(() => {
        navigate("/findstay");
      }, 1000);
    } catch (error) {
      console.error(
        "Property creation error:",
        error.response?.data || error
      );

      const message =
        error.response?.data?.message ||
        "Failed to post property. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] py-10 px-4 relative overflow-hidden">
      <style>{`
        @keyframes rfFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes rfGlow {
          0%, 100% { transform: scale(1); opacity: .16; }
          50% { transform: scale(1.08); opacity: .25; }
        }

        .rf-fade-up {
          animation: rfFadeUp .65s cubic-bezier(.22,1,.36,1) both;
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

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#4A7FA7]/20 rounded-full blur-3xl rf-glow pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] bg-[#0A1931]/10 rounded-full blur-3xl rf-glow pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 rf-fade-up">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER - same RoomFinder theme as Roomies */}
          <div className="bg-[#0A1931] text-white px-6 md:px-10 py-10 relative overflow-hidden">
            <div className="absolute -top-20 -right-16 w-60 h-60 bg-[#4A7FA7]/30 rounded-full blur-3xl rf-glow" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-[#B3CFE5] px-4 py-2 rounded-full text-xs font-semibold">
                <FaHome />
                RoomFinder Property Listing
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold mt-5">
                Post Your Property
              </h1>

              <p className="text-[#B3CFE5] mt-2 max-w-2xl text-sm md:text-base leading-6">
                List your room, PG, hostel, flat or apartment and
                connect with people looking for a place to stay.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-9">

            {/* PROPERTY INFORMATION */}
            <section className="rf-fade-up">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  01
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Property Information
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Tell seekers about your property
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
                    placeholder="e.g., Luxury Single Room near MP Nagar"
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
                              ? "bg-[#0A1931] text-white border-[#0A1931] shadow-md -translate-y-0.5"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB] hover:-translate-y-0.5"
                          }`}
                        >
                          {selected && <FaCheck className="text-[10px]" />}
                          {type.icon}
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1931] mb-3">
                    Sharing / Room Type
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
                              ? "bg-[#4A7FA7] text-white border-[#4A7FA7] shadow-md -translate-y-0.5"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB] hover:-translate-y-0.5"
                          }`}
                        >
                          {selected && <FaCheck className="text-[10px]" />}
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
                    placeholder="Describe your space, rules, nearby locations..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all resize-none"
                  />
                </div>
              </div>
            </section>

            {/* PRICING */}
            <section className="rf-fade-up">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  02
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Pricing & Availability
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Set your monthly pricing
                  </p>
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
                      placeholder="6500"
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
                      placeholder="10000"
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
            <section className="rf-fade-up">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  03
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Location Details
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Help seekers find your property
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["state", "State"],
                  ["city", "City"],
                  ["area", "Area / Landmark Area"],
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
            <section className="rf-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#F4F8FB] rounded-2xl p-5">
                  <h2 className="text-lg font-bold text-[#0A1931] mb-3">
                    Target Preferences
                  </h2>

                  <select
                    name="genderPreference"
                    value={formData.genderPreference}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#B3CFE5] bg-white rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  >
                    <option value="">Select Gender Preference</option>
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
                    required
                    className="w-full border border-[#B3CFE5] bg-white rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  >
                    <option value="">Select Furnishing</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">
                      Semi-Furnished
                    </option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </section>

            {/* AMENITIES */}
            <section className="rf-fade-up">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                <span className="w-9 h-9 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center font-bold text-sm">
                  04
                </span>

                <div>
                  <h2 className="text-xl font-bold text-[#0A1931]">
                    Included Amenities
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Select everything your property offers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {amenityList.map((item) => {
                  const selected = formData.amenities.includes(
                    item.name
                  );

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleAmenity(item.name)}
                      className={`flex items-center gap-2 p-3.5 rounded-xl border text-xs font-semibold text-left transition-all duration-300 ${
                        selected
                          ? "bg-[#EEF5FA] text-[#4A7FA7] border-[#4A7FA7] shadow-sm -translate-y-0.5"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#4A7FA7] hover:bg-[#F4F8FB] hover:-translate-y-0.5"
                      }`}
                    >
                      <span
                        className={`text-base ${
                          selected
                            ? "text-[#4A7FA7]"
                            : "text-gray-400"
                        }`}
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

            {/* CONTACT + IMAGES */}
            <section className="rf-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center">
                      <FaPhoneAlt />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#0A1931]">
                        Owner Contact
                      </h2>
                      <p className="text-xs text-gray-400">
                        Contact number for interested seekers
                      </p>
                    </div>
                  </div>

                  <input
                    name="contactNumber"
                    type="tel"
                    inputMode="numeric"
                    maxLength="10"
                    required
                    placeholder="10-Digit Mobile Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full border border-[#B3CFE5] rounded-xl px-4 py-3 outline-none focus:border-[#4A7FA7] focus:ring-4 focus:ring-[#4A7FA7]/10 transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF5FA] text-[#4A7FA7] flex items-center justify-center">
                      <FaCloudUploadAlt />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#0A1931]">
                        Property Images
                      </h2>
                      <p className="text-xs text-gray-400">
                        Add up to 5 images
                      </p>
                    </div>
                  </div>

                  <label className="block border-2 border-dashed border-[#B3CFE5] rounded-2xl p-5 bg-[#F8FBFD] hover:bg-[#F4F8FB] hover:border-[#4A7FA7] transition-all duration-300 cursor-pointer text-center">
                    <FaCloudUploadAlt className="text-3xl text-[#4A7FA7] mx-auto mb-2" />

                    <p className="text-sm font-bold text-[#0A1931]">
                      Choose Property Images
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG or WEBP • Max 5MB each • Up to 5 images
                    </p>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {images.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-bold text-[#4A7FA7]">
                          {images.length}/5 images selected
                        </p>

                        <p className="text-[11px] text-gray-400">
                          First image = cover
                        </p>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {images.map((image, index) => (
                          <div
                            key={`${image.name}-${image.size}-${image.lastModified}`}
                            className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100 group"
                          >
                            <img
                              src={previewImages[index]}
                              alt={`Property preview ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {index === 0 && (
                              <span className="absolute left-1.5 bottom-1.5 bg-[#0A1931]/90 text-white text-[9px] font-bold px-2 py-1 rounded-full">
                                Cover
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/65 text-white flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label={`Remove image ${index + 1}`}
                            >
                              <FaTimes className="text-[10px]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SUBMIT */}
            <section className="pt-2 rf-fade-up">
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-4 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0A1931] hover:bg-[#4A7FA7] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Publishing Property...
                  </span>
                ) : (
                  "Publish Property Listing"
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                Your property will be visible on FindStays after publishing.
              </p>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;

