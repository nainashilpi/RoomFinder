import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaHome,
  FaBed,
  FaRupeeSign,
  FaCalendarAlt,
  FaUserFriends,
  FaCouch,
  FaPhoneAlt,
  FaWifi,
  FaSnowflake,
  FaParking,
  FaUtensils,
  FaBath,
  FaBolt,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

import { MdOutlineBedroomParent } from "react-icons/md";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  // =====================================================
  // FETCH PROPERTY
  // =====================================================

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );

        console.log("Property Details:", response.data.data);

        setProperty(response.data.data);
        setCurrentImage(0);
      } catch (error) {
        console.error("Error fetching property:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch property details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // =====================================================
  // AMENITY ICON
  // =====================================================

  const getAmenityIcon = (amenity) => {
    const icons = {
      WiFi: <FaWifi />,
      AC: <FaSnowflake />,
      Parking: <FaParking />,
      Food: <FaUtensils />,
      "Attached Bathroom": <FaBath />,
      "Power Backup": <FaBolt />,
      Furnished: <MdOutlineBedroomParent />,
    };

    return icons[amenity] || <FaCheckCircle />;
  };

  // =====================================================
  // IMAGE SLIDER
  // =====================================================

  const images = property?.images || [];

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImage(
        (prev) => (prev + 1) % images.length
      );
    }
  };

  const previousImage = () => {
    if (images.length > 0) {
      setCurrentImage(
        (prev) =>
          (prev - 1 + images.length) % images.length
      );
    }
  };

  // =====================================================
  // AUTO IMAGE SLIDESHOW
  // =====================================================

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setCurrentImage(0);
  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#B3CFE5] border-t-[#0A1931] rounded-full animate-spin" />

        <p className="text-[#4A7FA7] mt-5 font-medium">
          Loading property details...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full">
          <FaHome className="text-5xl text-[#B3CFE5] mx-auto" />

          <h1 className="text-2xl font-bold text-[#0A1931] mt-5">
            Something went wrong
          </h1>

          <p className="text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => navigate("/findStay")}
            className="mt-6 bg-[#0A1931] hover:bg-[#4A7FA7] text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // PROPERTY NOT FOUND
  // =====================================================

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex items-center justify-center">
        <h1 className="text-2xl font-bold text-[#0A1931]">
          Property Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F8FB] pb-16">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="bg-[#0A1931] text-white px-5 pt-10 pb-32 relative overflow-hidden">

        <div className="absolute w-72 h-72 bg-[#4A7FA7]/20 rounded-full blur-3xl -top-20 -right-20" />

        <div className="absolute w-60 h-60 bg-[#4A7FA7]/10 rounded-full blur-3xl bottom-0 -left-20" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* BACK BUTTON */}

          <button
            onClick={() => navigate("/findStay")}
            className="flex items-center gap-2 text-[#B3CFE5] hover:text-white transition mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />

            <span className="text-sm font-semibold">
              Back to Properties
            </span>
          </button>

          {/* HEADING */}

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

            <div>

              <div className="flex flex-wrap gap-2 mb-4">

                <span className="bg-[#4A7FA7] text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  {property.propertyType}
                </span>

                <span className="bg-white/10 border border-white/10 text-[#B3CFE5] px-3 py-1.5 rounded-lg text-xs font-semibold">
                  {property.status || "Available"}
                </span>

                {property.isVerified && (
                  <span className="bg-green-500/20 border border-green-400/20 text-green-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <FaShieldAlt />
                    Verified
                  </span>
                )}

              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-[#B3CFE5] mt-4">

                <FaMapMarkerAlt />

                <span>
                  {property.location?.area &&
                    `${property.location.area}, `}

                  {property.location?.city ||
                    "Location unavailable"}

                  {property.location?.state &&
                    `, ${property.location.state}`}
                </span>

              </div>

            </div>

            {/* PRICE */}

            <div className="lg:text-right">

              <p className="text-[#B3CFE5] text-sm">
                Monthly Rent
              </p>

              <div className="flex items-center lg:justify-end mt-1">

                <FaRupeeSign className="text-xl" />

                <span className="text-4xl font-extrabold">
                  {Number(property.rent).toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span className="text-[#B3CFE5] ml-1">
                  /month
                </span>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="max-w-7xl mx-auto px-5 -mt-20 relative z-20">

        {/* ================================================= */}
        {/* IMAGE SLIDER */}
        {/* ================================================= */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">

          {/* MAIN IMAGE */}

          <div className="w-full aspect-[4/3] md:aspect-[16/9] min-h-[330px] md:min-h-[520px] bg-[#EAF2F8] relative overflow-hidden">

            {images.length > 0 ? (
              <>

                <img
                  key={images[currentImage]}
                  src={images[currentImage]}
                  alt={`${property.title} ${currentImage + 1}`}
                  className="w-full h-full object-contain transition-all duration-700 ease-in-out"
                />

                {/* PREVIOUS */}

                {images.length > 1 && (
                  <button
                    onClick={previousImage}
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition"
                  >
                    <FaArrowLeft />
                  </button>
                )}

                {/* NEXT */}

                {images.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition"
                  >
                    <FaArrowRight />
                  </button>
                )}

                {/* COUNTER */}

                {images.length > 1 && (
                  <div className="absolute top-4 right-4 md:top-5 md:right-5 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {currentImage + 1} / {images.length}
                  </div>
                )}

                {/* DOTS */}

                {images.length > 1 && (
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setCurrentImage(index)
                        }
                        className={`h-2.5 rounded-full transition-all ${
                          currentImage === index
                            ? "w-8 bg-white"
                            : "w-2.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                )}

              </>
            ) : (

              <div className="w-full h-full flex flex-col items-center justify-center">

                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <FaHome className="text-5xl text-[#4A7FA7]" />
                </div>

                <p className="text-[#4A7FA7] mt-5">
                  Property image coming soon
                </p>

              </div>

            )}

          </div>

          {/* ================================================= */}
          {/* THUMBNAILS */}
          {/* ================================================= */}

          {images.length > 1 && (
            <div className="p-4 flex gap-3 overflow-x-auto">

              {images.map((image, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentImage(index)
                  }
                  className={`w-24 h-20 md:w-28 md:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                    currentImage === index
                      ? "border-[#4A7FA7]"
                      : "border-transparent"
                  }`}
                >

                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                </button>

              ))}

            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* CONTENT GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="lg:col-span-2 space-y-8">

            {/* OVERVIEW */}

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">

              <h2 className="text-2xl font-bold text-[#0A1931]">
                Property Overview
              </h2>

              <p className="text-gray-500 leading-7 mt-4">
                {property.description}
              </p>

              {/* FEATURES */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                <div className="bg-[#F4F8FB] rounded-2xl p-4">
                  <FaHome className="text-[#4A7FA7] text-xl" />

                  <p className="text-xs text-gray-400 mt-3">
                    Property Type
                  </p>

                  <p className="font-bold text-[#0A1931] mt-1">
                    {property.propertyType}
                  </p>
                </div>

                <div className="bg-[#F4F8FB] rounded-2xl p-4">
                  <FaBed className="text-[#4A7FA7] text-xl" />

                  <p className="text-xs text-gray-400 mt-3">
                    Room Type
                  </p>

                  <p className="font-bold text-[#0A1931] mt-1">
                    {property.roomType}
                  </p>
                </div>

                <div className="bg-[#F4F8FB] rounded-2xl p-4">
                  <FaUserFriends className="text-[#4A7FA7] text-xl" />

                  <p className="text-xs text-gray-400 mt-3">
                    Preferred For
                  </p>

                  <p className="font-bold text-[#0A1931] mt-1">
                    {property.genderPreference ||
                      "Anyone"}
                  </p>
                </div>

                <div className="bg-[#F4F8FB] rounded-2xl p-4">
                  <FaCouch className="text-[#4A7FA7] text-xl" />

                  <p className="text-xs text-gray-400 mt-3">
                    Furnishing
                  </p>

                  <p className="font-bold text-[#0A1931] mt-1">
                    {property.furnishing ||
                      "Not specified"}
                  </p>
                </div>

              </div>

            </section>

            {/* AMENITIES */}

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">

              <h2 className="text-2xl font-bold text-[#0A1931]">
                Amenities
              </h2>

              {property.amenities?.length > 0 ? (

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                  {property.amenities.map(
                    (amenity) => (

                      <div
                        key={amenity}
                        className="flex items-center gap-3 bg-[#F4F8FB] rounded-2xl p-4"
                      >

                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#4A7FA7]">
                          {getAmenityIcon(amenity)}
                        </div>

                        <span className="text-sm font-semibold text-[#0A1931]">
                          {amenity}
                        </span>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="text-gray-500 mt-4">
                  No amenities specified.
                </p>

              )}

            </section>

            {/* LOCATION */}

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">

              <h2 className="text-2xl font-bold text-[#0A1931]">
                Location Details
              </h2>

              <div className="flex items-start gap-4 mt-6 bg-[#F4F8FB] rounded-2xl p-5">

                <div className="w-12 h-12 min-w-12 bg-[#4A7FA7] text-white rounded-xl flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <p className="font-bold text-[#0A1931]">
                    {property.location?.area ||
                      "Area not specified"}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {property.location?.address}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {property.location?.city}

                    {property.location?.state &&
                      `, ${property.location.state}`}
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <div>

            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-6">

              <p className="text-gray-400 text-sm">
                Monthly Rent
              </p>

              <div className="flex items-center text-[#0A1931] mt-1">

                <FaRupeeSign className="text-lg" />

                <span className="text-3xl font-extrabold">
                  {Number(property.rent).toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span className="text-gray-400 text-sm ml-1">
                  /month
                </span>

              </div>

              {/* SECURITY */}

              <div className="border-t border-gray-100 mt-6 pt-5">

                <div className="flex justify-between">

                  <span className="text-gray-500 text-sm">
                    Security Deposit
                  </span>

                  <span className="font-bold text-[#0A1931]">
                    ₹
                    {Number(
                      property.securityDeposit || 0
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="flex justify-between items-center mt-4">

                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <FaCalendarAlt className="text-[#4A7FA7]" />
                    Available From
                  </span>

                  <span className="font-semibold text-[#0A1931] text-sm">
                    {property.availableFrom
                      ? new Date(
                          property.availableFrom
                        ).toLocaleDateString("en-IN")
                      : "Immediately"}
                  </span>

                </div>

              </div>

              {/* CONTACT */}

              <div className="mt-7">

                <p className="text-xs text-gray-400 mb-2">
                  Interested in this property?
                </p>

                <a
                  href={`tel:${property.contactNumber}`}
                  className="w-full bg-[#0A1931] hover:bg-[#4A7FA7] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <FaPhoneAlt />
                  Contact Owner
                </a>

                <p className="text-center text-sm text-gray-500 mt-4">
                  {property.contactNumber}
                </p>

              </div>

              {/* SAFETY */}

              <div className="bg-[#F4F8FB] rounded-xl p-4 mt-6 flex gap-3">

                <FaShieldAlt className="text-[#4A7FA7] mt-0.5 min-w-4" />

                <p className="text-xs text-gray-500 leading-5">
                  Never make payments before visiting
                  the property and verifying the owner
                  details.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default PropertyDetails;