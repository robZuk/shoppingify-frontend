import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { SiZeromq } from "react-icons/si";
import Spinner from "../Spinner";
import { useGetListsQuery } from "../../slices/listsApiSlice";

import { months, days } from "./dates";

function History() {
  const navigate = useNavigate();

  const { data: lists, isLoading, error } = useGetListsQuery();

  const groupedData = lists?.reduce((group, list) => {
    const date = new Date(list.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (!group[year]) {
      group[year] = {};
    }
    if (!group[year][month]) {
      group[year][month] = [];
    }
    group[year][month].push(list);
    return group;
  }, {});

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

  return (
    <div className="history">
      <p className="history-title">Shopping history</p>
      

      
      {isLoading ? (
        <Spinner />
      ) : (
        <div
        className="history-info"
        style={{ display: `${!lists?.length ? "grid" : "none"}` }}
      >
        <div className="empty-info">
          <SiZeromq className="empty-info-icon" />
          <span> No items</span>
        </div>
      </div> &&
        Object.keys(groupedData).map((year) => (
          <div key={year}>
            <div className="history-list-group">
              {Object.keys(groupedData[year]).map((month) => (
                <div key={month}>
                  <p className="history-list-group-title">
                    {months[month] + " " + year}
                  </p>

                  {groupedData[year][month].map((list) => (
                    <div
                      key={list._id}
                      className="history-list-group-list"
                      onClick={() => {
                        // list.status !== "active"
                        navigate(`/history/${list._id}`);
                        // : navigate(`/products`);
                      }}
                    >
                      <p className="history-list-group-list-name">
                        {list.name}
                      </p>
                      <p className="date">
                        <AiTwotoneCalendar className="date-icon" />
                        {days[new Date(list.createdAt).getDay()]}
                        {`${new Date(list.createdAt).getDate()}.${
                          new Date(list.createdAt).getMonth() + 1
                        }.${new Date(list.createdAt).getFullYear()}`}
                      </p>

                      <p
                        className={`${
                          list.status === "active"
                            ? "history-list-group-list-properties-status active"
                            : list.status === "completed"
                            ? "history-list-group-list-properties-status completed"
                            : "history-list-group-list-properties-status cancelled"
                        }`}
                      >
                        {list.status}
                      </p>
                      <MdOutlineArrowForwardIos className="history-list-group-list-properties-icon" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
