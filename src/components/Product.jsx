import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";

const apiUrl =
  "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [activeSize, setActiveSize] = useState("");
  const [error, setError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${apiUrl}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apiUrl]);

  const handleSizeClick = (size) => {
    setActiveSize(size);
    setError(false);
  };

  const handleAddToCart = () => {
    if (activeSize === "") {
      setError(true);
    } else {
      addToCart({ ...product, size: activeSize });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="product">
        <div className="product-image">
          <img src={product.imageURL} alt={product.title} />
        </div>
        <div className="product-info">
          <div className="product-text">
            <h2 className="product-title">{product.title}</h2>
            <h3 className="product-price">${product.price}.00</h3>
            <p className="product-description">{product.description}</p>
          </div>
          <div className="product-size">
            <div className="size-text">
              <h4 className="size-label">SIZE</h4>
              {error && <p className="error-message">PLEASE SELECT A SIZE</p>}
              <h4 className="size-selected">{activeSize}</h4>
            </div>
            <div className="button-size-container">
              {product.sizeOptions.map((sizeOption, index) => (
                <button
                  key={index}
                  className={`button-size ${
                    activeSize === sizeOption.label ? "active" : ""
                  }`}
                  onClick={() => handleSizeClick(sizeOption.label)}
                >
                  {sizeOption.label}
                </button>
              ))}
            </div>
          </div>
          <button className="button-addtocart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
