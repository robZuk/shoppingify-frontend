import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useSpring, animated } from "@react-spring/web";
import { deleteProduct } from "../../../features/products/productSlice";
import ConfirmButton from "../../atoms/ConfirmButton";
import CancelButton from "../../atoms/CancelButton";

function ProductDeleteModal({ setModalIsOpen, modalIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const refComp = useRef();

  const productId = location.pathname.slice(10, 34);

  const props = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    config: { duration: 500 },
  });

  useEffect(() => {
    window.outerWidth <= 850 &&
      refComp.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [modalIsOpen]);

  return (
    <div
      className="modal-container"
      ref={refComp}
      style={{ display: `${modalIsOpen ? "block" : "none"}` }}
    >
      <animated.div style={props}>
        <div>
          <div className="modal-delete">
            <IoMdClose
              className="modal-delete-close"
              onClick={() => setModalIsOpen(false)}
            />
            <p className="modal-delete-title">
              Are you sure that you want to cancel this list?
            </p>
            <div className="modal-delete-buttons">
              <CancelButton
                text="cancel"
                onClick={() => setModalIsOpen(false)}
              />
              <ConfirmButton
                text="Yes"
                bgColor="#eb5757"
                onClick={() => {
                  setModalIsOpen(false);
                  dispatch(deleteProduct(productId));
                  navigate("/");
                }}
              />
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default ProductDeleteModal;
