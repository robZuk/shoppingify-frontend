import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { days } from "../../main/dates";
import Spinner from "../../Spinner";
import { getList } from "../../../features/lists/listSlice";
import { getCategories } from "../../../features/categories/categorySlice";

function ListDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { id } = params;

  const { listDetails, isLoading, isError, message } = useSelector(
    (state) => state.lists
  );
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getList(id));
    dispatch(getCategories());

    window.outerWidth <= 850 &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    //errors
    isError &&
      toast.error(message, {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
  }, []);

  let groupByCategory = listDetails.products?.reduce((group, list) => {
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
          <p className="list-details-title">{listDetails.name}</p>
          <p className="date">
            <AiTwotoneCalendar className="date-icon" />
            {days[new Date(listDetails.createdAt).getDay()]}{" "}
            {`${new Date(listDetails.createdAt).getDate()}.${
              new Date(listDetails.createdAt).getMonth() + 1
            }.${new Date(listDetails.createdAt).getFullYear()}`}
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
                  {Object.keys(groupByCategory[key]).map((category) => {
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
