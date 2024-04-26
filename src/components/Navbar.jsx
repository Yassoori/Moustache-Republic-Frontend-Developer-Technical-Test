import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [miniCartVisible, setMiniCartVisible] = useState(false);
  const toggleMiniCart = () => {
    if (totalQuantity !== 0) {
        setMiniCartVisible(!miniCartVisible);
    }
  };

  return (
    <>
      <div className="bar">
        <div className="cart" id={`${miniCartVisible ? "open" : ""}`} onClick={toggleMiniCart}>
          <FontAwesomeIcon
            icon={faCartShopping}
            // style={{ color: "#888888" }}
            className="cart-icon"
          />
          <p className="cart-text">My Cart</p>
          <p>( {totalQuantity} )</p>
        </div>
      </div>
      <div className={`mini-cart ${miniCartVisible ? "visible" : ""}`}>
        {cartItems.map((item) => (
          <div key={item.id + item.size} className="cart-item">
            <img src={item.imageURL} alt={item.title} className="cart-image" />
            <div className="cart-text">
              <p className="cart-title">{item.title}</p>
              <p className="cart-price">
                {item.quantity}x ${item.price}.00
              </p>
              <p>Size: {item.size}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
