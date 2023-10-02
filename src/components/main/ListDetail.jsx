import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { days } from "./dates";
import Spinner from "../Spinner";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import { useGetListQuery } from "../../slices/listsApiSlice";
import {
  editListName,
  setId,
  setProductsFromList,
} from "../../slices/listSlice";

function ListDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { id } = params;

  const { data: categories } = useGetCategoriesQuery();

  const { data: list, isLoading, error } = useGetListQuery(id);

  useEffect(() => {
    if (list?.status === "active") {
      dispatch(setProductsFromList(list?.products));
      dispatch(editListName({ name: list?.name }));
      dispatch(setId(list?._id));
      navigate(`/products`);
    } else {
      dispatch(setProductsFromList([]));
      dispatch(editListName({ name: "" }));
      dispatch(setId(""));
    }
  }, [list]);

  useEffect(() => {
    window.outerWidth <= 850 &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  }, []);

  useEffect(() => {
    error &&
      toast.error(message, {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
  }, [error]);

  let groupByCategory = list?.products?.reduce((group, list) => {
    const { category } = list;
    group[category] = group[category] ?? [];
    group[category].push(list);
    return group;
  }, {});

  return (
    <div className="list-details">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="back-button"
            onClick={() => {
              navigate("/history");
            }}
          >
            <FaLongArrowAltLeft className="back-button-icon" /> back
          </button>
          <p className="list-details-title">{list.name}</p>
          <p className="date">
            <AiTwotoneCalendar className="date-icon" />
            {days[new Date(list.createdAt).getDay()]}{" "}
            {`${new Date(list.createdAt).getDate()}.${
              new Date(list.createdAt).getMonth() + 1
            }.${new Date(list.createdAt).getFullYear()}`}
          </p>

          {Object.keys(groupByCategory !== undefined && groupByCategory).map(
            (key) => (
              <div key={key} className="category-wrapper">
                {categories.map((category) => {
                  if (category._id === key) {
                    return category.name;
                  }
                })}
                <div className="list-details-category">
                  {Object.keys(
                    groupByCategory !== undefined && groupByCategory[key]
                  ).map((category) => {
                    return (
                      <div
                        key={groupByCategory[key][category]._id}
                        className="list-details-category-products"
                      >
                        <span className="list-details-category-products-name">
                          {groupByCategory[key][category].name}
                        </span>
                        <span className="list-details-category-products-quantity">
                          {groupByCategory[key][category].quantity + " pcs"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default ListDetail;
