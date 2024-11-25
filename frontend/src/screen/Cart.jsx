import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCart, useDispatchCart } from "../context/ContextReducer";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <>
      {data.length === 0 ? (
        <div>
          <div className="m-5 w-100 text-center text-white fs-3">
            The Cart is Empty!
          </div>
        </div>
      ) : (
        <div>
          {console.log(data)}
          <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
            <table className="table table-hover ">
              <thead className=" text-success fs-4">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Option</th>
                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td className="p-2 ">{food.name}</td>
                    <td className="p-2">{food.qty}</td>
                    <td className="p-2">{food.size}</td>
                    <td className="p-2">{food.price}</td>
                    <td>
                      <button type="button" className="btn p-0 w-100">
                        <FaRegTrashAlt
                          className=" text-danger fs-3 pb-2 text-center"
                          onClick={() => {
                            dispatch({ type: "REMOVE", index: index });
                          }}
                        />
                      </button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h1 className="fs-2 text-white">Total Price: ₹{totalPrice}/-</h1>
            </div>
            <div>
              <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
