import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Register() {

  const [formData, setFormData] = useState({

      username:"",
      email:"",
      password:""

  });
   const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  
    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData)
      .then((response) => {
        console.log(response.data);
        // Handle successful registration (e.g., redirect to login page)
        toast.success("User Registered Successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Status:", error.response.status);
        console.log("Message:", error.response.data);
        toast.error("Registration Failed");
     });
  };

  return (
    <div className="min-h-screen bg-[#1A3D63] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#F6FAFD] rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1931]">
            Create Account
          </h1>

          <p className="text-[#4A7FA7] mt-2">
            Join RoomFinder and find your perfect room.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-[#0A1931] font-medium mb-2"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#B3CFE5] outline-none focus:border-[#4A7FA7]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[#0A1931] font-medium mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#B3CFE5] outline-none focus:border-[#4A7FA7]"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-[#0A1931] font-medium mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#B3CFE5] outline-none focus:border-[#4A7FA7]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#4A7FA7] hover:bg-[#0A1931] text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-[#1A3D63] mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#4A7FA7] font-semibold hover:text-[#0A1931]"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;