import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { SiZeromq } from "react-icons/si";
import Spinner from "../Spinner";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import Search from "./Search";
import { Context } from "../../context";

function Products() {
  const { keyword, setKeyword } = useContext(Context);

  const API_URL = import.meta.env.VITE_BASE_URL;
  console.log(API_URL);

  const navigate = useNavigate();

  // const {
  //   data: products,
  //   isLoading: isLoadingProducts,
  //   error: productsError,
  // } = useGetProductsQuery({
  //   keyword,
  // });
  // const {
  //   data: categories,
  //   isLoading: isLoadingCategories,
  //   error: categoriesError,
  // } = useGetCategoriesQuery();

  // const { products: productsOnList } = useSelector((state) => state.list);

  // console.log(products);

  // useEffect(() => {
  //   window.outerWidth <= 850 &&
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  // }, []);

  // useEffect(() => {
  //   //errors
  //   categoriesError &&
  //     toast.error(categoriesError?.data?.message || categoriesError.error, {
  //       toastId: "error1",
  //       position: "top-center",
  //       theme: "colored",
  //     });
  //   productsError &&
  //     toast.error(productsError?.data?.message || productsError.error, {
  //       toastId: "error2",
  //       position: "top-center",
  //       theme: "colored",
  //     });
  // }, [categoriesError, productsError]);

  // const selectedCategories = [...new Set(products?.map((obj) => obj.category))];
  return (
    <>
      <div>Products</div>
      {/* {isLoadingProducts && isLoadingCategories ? (
        <Spinner />
      ) : (
        <div className="products-wrapper">
          <div className="products">
            <div className="products-header">
              <div className="products-header-title">
                <span className="first-word">Shoppingify</span> allows you take
                your shopping list wherever you go
              </div>
              <Search />
            </div>
            <div
              className="products-info"
              style={{ display: `${products?.length ? "none" : "grid"}` }}
            >
              <div className="empty-info">
                <SiZeromq className="empty-info-icon" />
                <span> No items</span>
              </div>
            </div>
            <div className="categories">
              {categories?.map((category) => (
                <div key={category._id} className="categories-category">
                  <p className="categories-category-name">
                    {selectedCategories.includes(category._id) && category.name}
                  </p>
                  <div className="animation-products products">
                    {products
                      ?.filter((product) => product.category === category._id)
                      .map((product) => (
                        <div
                          className="product"
                          key={product._id}
                          onClick={() => {
                            !productsOnList.find(
                              (productonList) =>
                                productonList._id === product._id
                            ) &&
                              navigate(`/products/${product._id}`) &&
                              setKeyword("");
                          }}
                        >
                          <p className="product-name">{product.name}</p>
                          <AiOutlinePlus className="plus-icon" />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Products;
