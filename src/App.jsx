import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/products/ProductsPage";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, width: "100%" }}>
        <ProductsPage />
      </div>
    </div>
  );
}

export default App;
