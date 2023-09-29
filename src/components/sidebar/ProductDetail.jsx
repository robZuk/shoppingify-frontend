import React, { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaLongArrowAltLeft } from "react-icons/fa";
import CancelButton from "../atoms/CancelButton";
import ConfirmButton from "../atoms/ConfirmButton";
import Spinner from "../Spinner";
// import { getProduct } from "../../features/products/productSlice";
// import { addProductToList } from "../../features/lists/listSlice";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import { addProductToList } from "../../slices/listSlice";

function ProductDetail({ setModalIsOpen, setProductId }) {
  let { productId } = useParams();

  const navigate = useNavigate();
  const refComp = useRef();

  const scrollTop = useCallback(() => {
    refComp.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [productId]);

  useEffect(() => {
    setProductId(productId);
  }, [productId]);

  // const {
  //   product,
  //   isLoading: productsIsLoading,
  //   isError: productsIsError,
  //   message: productsMessage,
  // } = useSelector((state) => state.products);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // console.log(product);

  const {
    data: categories,
    // isLoading: isLoadingCategories,
    // error: categoriesError,
  } = useGetCategoriesQuery();

  // console.log(categories);
  const category =
    product && product.category
      ? categories?.find((category) => category._id == product.category)
      : undefined;
  // console.log(categories);
  // console.log(category);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.outerWidth <= 850 && scrollTop();

  //   // dispatch(getProduct(productId));

  //   productsIsError &&
  //     toast.error(error?.data?.message || error.error, {
  //       toastId: "error1",
  //       position: "top-center",
  //       theme: "colored",
  //     });
  // }, [dispatch, productsIsError]);

  return (
    <>
      <div className="product-details" ref={refComp}>
        <button
          className="back-button"
          onClick={() => {
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <FaLongArrowAltLeft className="back-button-icon" /> back
        </button>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div
              className="product-details-image"
              style={{
                backgroundImage:
                  product?.image &&
                  `url(${import.meta.env.VITE_BASE_URL}/uploads/${
                    product.image
                  })`,
              }}
            ></div>

            <div className="product-details-information">
              <div className="product-details-information-name">
                <p className="product-details-information-title">name</p>
                <p>{product.name}</p>
              </div>
              <div className="product-details-information-category">
                <p className="product-details-information-title">category</p>
                <p>{category?.name}</p>
              </div>
              <div className="product-details-information-note">
                <p className="product-details-information-title">note</p>
                <p>{product.note}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="sidebar-footer product-details-buttons">
        <CancelButton
          text="delete"
          onClick={() => {
            setModalIsOpen(true);
          }}
        />
        <ConfirmButton
          text="Add to list"
          bgColor="#f9a109"
          onClick={() => {
            navigate("/");
            dispatch(
              addProductToList({
                ...product,
                quantity: 1,
                confirmed: false,
              })
            );
          }}
        />
      </div>
    </>
  );
}

export default ProductDetail;
