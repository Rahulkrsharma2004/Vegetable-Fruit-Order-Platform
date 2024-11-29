import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAdminLoggedIn, setIsAdminLoggedIn ,setAdmin} = useContext(AuthContext);
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
        let firstName = response.data.adminData.name.split(" ")[0];
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-6 rounded shadow-md w-80"
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
            already login ?{" "}
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
  );
};

export default AdminLogin;
