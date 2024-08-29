import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "../context/ContextReducer";

const Card = ({ foodItems, options }) => {
  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let priceOptions = Object.keys(options);

  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === foodItems._id);

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItems._id,
          name: foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
    }
    await dispatch({
      type: "ADD",
      id: foodItems._id,
      name: foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "560px" }}>
        <img
          src={foodItems.img}
          className="card-img-top"
          alt={foodItems.name}
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItems.name}</h5>
          <p className="card-text">{foodItems.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
