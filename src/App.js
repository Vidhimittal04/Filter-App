import React, { useState, useEffect } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0); 
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(0); 
  };

  const filteredData = () => {
    let filteredItems = products;

    if (query) {
      filteredItems = filteredItems.filter(
        (product) => product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredItems = filteredItems.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selectedCategory ||
          color === selectedCategory ||
          company === selectedCategory ||
          newPrice === selectedCategory ||
          title === selectedCategory
      );
    }

    return filteredItems;
  };

  const totalItems = filteredData().length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const result = filteredData()
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    .map(({ img, title, star, reviews, prevPrice, newPrice }) => (
      <Card
        key={title}
        img={img}
        title={title}
        star={star}
        reviews={reviews}
        prevPrice={prevPrice}
        newPrice={newPrice}
      />
    ));

  return (
    <>
  <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
  }}
>
  <button
    style={{
      padding: "5px 10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      marginRight: "10px",
    }}
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 0}
  >
    Previous
  </button>
  <span style={{ margin: "0 10px" }}>
    Page {currentPage + 1} of {totalPages}
  </span>
  <button
    style={{
      padding: "5px 10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    }}
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages - 1}
  >
    Next
  </button>
</div>

      <Sidebar handleChange={handleChange} />
      <Products result={result} />
    
    </>
  );
}

export default App;
