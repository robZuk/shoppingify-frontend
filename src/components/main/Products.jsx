import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { SiZeromq } from "react-icons/si";
import Spinner from "../Spinner";
import { getCategories } from "../../features/categories/categorySlice";
import { getProducts } from "../../features/products/productSlice";
import Search from "./Search";
import { Context } from "../../context";

function Products() {
  const {
    categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  const {
    products,
    isLoading: productsIsLoading,
    isError: productsIsError,
    message: productsMessage,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products: productsOnList } = useSelector((state) => state.lists.list);

  const { setKeyword } = useContext(Context);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("keyword");

  useEffect(() => {
    window.outerWidth <= 850 &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    dispatch(getCategories());
    dispatch(getProducts(searchValue ? searchValue : ""));

    //errors
    categoriesIsError &&
      toast.error(categoriesMessage, {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
    productsIsError &&
      toast.error(productsMessage, {
        toastId: "error2",
        position: "top-center",
        theme: "colored",
      });
  }, [dispatch, categoriesIsError, productsIsError, searchValue]);

  const selectedCategories = [...new Set(products.map((obj) => obj.category))];
  return (
    <>
      {productsIsLoading && categoriesIsLoading ? (
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
              style={{ display: `${products.length ? "none" : "grid"}` }}
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
                      .filter((product) => product.category === category._id)
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
      )}
    </>
  );
}

export default Products;
