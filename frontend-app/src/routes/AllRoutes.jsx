// App.js
import React from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import AdminPage from "../pages/AdminPage";
import Navbar from "../components/Navbar";

function AllRoutes() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
        </Routes>
      </div>
  );
}

export default AllRoutes;
