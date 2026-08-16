import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Login() {

  const [formData, setFormData] = useState({
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
    axios.post("http://localhost:5000/api/auth/login", formData)
      .then((response) => {
        console.log(response.data);
        // Handle successful login (e.g., redirect to dashboard)
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        console.log("Status:", error.response.status);
        console.log("Message:", error.response.data);
        toast.error("Login Failed");
      });
  };


  return (
    <div className="min-h-screen bg-[#1A3D63] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#F6FAFD] rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1931]">
            Welcome Back
          </h1>

          <p className="text-[#4A7FA7] mt-2">
            Login to your RoomFinder account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#B3CFE5] outline-none focus:border-[#4A7FA7]"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-[#4A7FA7] hover:text-[#0A1931]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#4A7FA7] hover:bg-[#0A1931] text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-[#1A3D63] mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#4A7FA7] font-semibold hover:text-[#0A1931]"
            >
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;