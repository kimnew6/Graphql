import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Product from "./Product";
import ProductDetail from "./ProductDetail";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/*" element={<ProductDetail />} />
        {/* <Route path="/product/*" element={<ProductDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
