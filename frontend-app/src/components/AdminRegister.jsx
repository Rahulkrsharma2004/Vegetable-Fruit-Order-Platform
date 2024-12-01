import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://veg-order-platform.vercel.app/auth/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response);

      alert("Registration successful!");
      console.log("register", response.data.adminData.name);
      // toast.success("Registration successful!");
      navigate("/admin-login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-gray-100">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Admin Register</h1>
      <div className="flex flex-col rounded  md:flex-row items-center space-x-0 md:space-x-6 space-y-6 md:space-y-0 shadow-md">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-4922762-4097209.png"
          alt="Login illustration"
          className="w-72 h-auto"
        />
        <form
          onSubmit={handleRegister}
          className="p-6 rounded w-80"
        >
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="border p-2 mb-4 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="border p-2 mb-4 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-700"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <p>
              already register ?{" "}
              <Link to="/admin-login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
