// App.js
import React from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import Navbar from "../components/Navbar";
import AdminLoginForm from "../components/AdminLoginForm";
import AdminDashboard from "../components/AdminDashboard";

function AllRoutes() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/login" element={<AdminLoginForm />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
        </Routes>
      </div>
  );
}

export default AllRoutes;
