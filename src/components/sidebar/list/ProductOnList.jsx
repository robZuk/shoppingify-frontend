import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  removeProductFromList,
  setQuantity,
  confirmProductToogle,
} from "../../../slices/listSlice";

function Product({ product }) {
  const dispatch = useDispatch();

  const [editQuantity, setEditQuantity] = useState(false);

  return (
    <div key={product._id} className="product-on-list">
      <p className="product-on-list-name">
        <input
          type="checkbox"
          checked={product.confirmed}
          onChange={() => {
            dispatch(
              confirmProductToogle({ confirm: !product.confirmed, product })
            );
          }}
        ></input>
        <span
          style={{ textDecoration: `${product.confirm ? "line-through" : ""}` }}
        >
          {product.name}
        </span>
      </p>
      <div className="product-on-list-quantity">
        <div
          className="product-on-list-quantity-open"
          style={{ display: `${editQuantity ? "grid" : "none"}` }}
        >
          <FaRegTrashAlt
            className="product-on-list-quantity-open-trash"
            onClick={() => {
              dispatch(removeProductFromList(product._id));
            }}
          />
          <div className="product-on-list-quantity-open-wrapper">
            <span
              onClick={() => {
                dispatch(
                  setQuantity({ id: product._id, value: product.quantity - 1 })
                );
              }}
            >
              &#8722;
            </span>
            <span onClick={() => setEditQuantity(false)}>
              {product.quantity} pcs
            </span>
            <span
              onClick={() => {
                dispatch(
                  setQuantity({ id: product._id, value: product.quantity + 1 })
                );
              }}
            >
              &#43;
            </span>
          </div>
        </div>
        <div
          className="product-on-list-quantity-close"
          style={{ display: `${!editQuantity ? "grid" : "none"}` }}
        >
          <span onClick={() => setEditQuantity(true)}>
            {product.quantity} pcs
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
