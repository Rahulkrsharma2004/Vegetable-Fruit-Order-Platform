// App.js
import React from "react";
import {  Route, Routes } from "react-router-dom";
import OrderPage from "../pages/OrderPage";
import Navbar from "../components/Navbar";
import AdminDashboard from "../components/AdminDashboard";
import ProductCatalog from "../components/ProductCatalog";
import AdminLogin from "../components/AdminLogin";
import AdminRegister from "../components/AdminRegister";
import CartPage from "../pages/CartPage";

function AllRoutes() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductCatalog />}></Route>
          <Route path="/cart/:productId" element={<CartPage/>}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route path="/admin-register" element={<AdminRegister />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        </Routes>
      </div>
  );
}

export default AllRoutes;
