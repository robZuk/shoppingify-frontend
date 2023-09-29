import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web";
import { useDeleteProductMutation } from "../../../slices/productsApiSlice";
import ConfirmButton from "../../atoms/ConfirmButton";
import CancelButton from "../../atoms/CancelButton";
import Spinner from "../../Spinner";

function ProductDeleteModal({ setModalIsOpen, modalIsOpen, id }) {
  const navigate = useNavigate();
  const refComp = useRef();

  const props = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    config: { duration: 500 },
  });

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  useEffect(() => {
    window.outerWidth <= 850 &&
      refComp.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [modalIsOpen]);

  const deleteHandler = async () => {
    try {
      await deleteProduct(id);
      toast.error("Product deleted successfully", {
        toastId: "info",
        position: "top-center",
        theme: "light",
      });
      isLoading && <Spinner />;
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        toastId: "error",
        position: "top-center",
        theme: "colored",
      });
    }
  };

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
                  deleteHandler();
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
