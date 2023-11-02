import React from "react";
import "./Products.css";
import ReactPaginate from "react-paginate";

function Products({ result, totalPages, onPageChange }) {
  return (
    <div className="products">
      <section className="card-container">{result}</section>

   
    </div>
  );
}

export default Products;
