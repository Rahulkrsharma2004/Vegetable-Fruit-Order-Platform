import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAdminLoggedIn, setIsAdminLoggedIn, setAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://veg-order-platform.vercel.app/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      if (response.data.message === "Admin login successful") {
        let firstName = response.data.adminData.name.charAt(0).toUpperCase();
        setIsAdminLoggedIn(true);
        setAdmin(firstName);
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminName", firstName);
        alert("Login successfully");
        navigate("/admin-dashboard");
        // toast.success('Login successful');
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-gray-100">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
      <div className="flex flex-col rounded shadow-md  md:flex-row items-center space-x-0 md:space-x-6 space-y-6 md:space-y-0">
        <img 
          src="https://th.bing.com/th/id/R.87e87fa8cb1c4d332a64470d5c3acd89?rik=vuWahGaWKYN5CQ&riu=http%3a%2f%2fdli-eduventure.um.ac.id%2fassets%2fimg%2flogin.png&ehk=hPJNQY6rdxBzsCPJa9ahwTJgf6KEPNQdNr1lfqo1NTk%3d&risl=&pid=ImgRaw&r=0" 
          alt="Login illustration" 
          className="w-72 h-auto"
        />
        <form
          onSubmit={handleAdminLogin}
          className="p-6 rounded  w-80"
        >
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
            Login
          </button>
          <div className="mt-4 text-center">
            <p>
              already login?{" "}
              <Link
                to="/admin-register"
                className="text-blue-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
