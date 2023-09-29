import React, { useEffect } from "react";
import { months } from "./dates";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SiZeromq } from "react-icons/si";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import { useGetListsQuery } from "../../slices/listsApiSlice";
import Spinner from "../Spinner";

function Stats() {
  const { data: categories, error: categoriesError } = useGetCategoriesQuery();

  const { data: lists, isLoading, error: listsError } = useGetListsQuery();

  useEffect(() => {
    window.outerWidth <= 850 &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  }, []);

  useEffect(() => {
    listsError &&
      toast.error(listsError?.data?.message || listsError.error, {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
    categoriesError &&
      toast.error(categoriesError?.data?.message || categoriesError.error, {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
  }, [listsError, categoriesError]);

  //Concatenate all products
  const allProducts = lists?.reduce(
    (prev, curr) => [...prev, ...curr.products],
    []
  );

  //Top Products calculation
  const productsQuantity = allProducts?.reduce((prev, curr) => {
    if (!prev[curr.name]) {
      prev[curr.name] = {
        quantity: 0,
      };
    }
    prev[curr.name].quantity += curr.quantity;
    return prev;
  }, {});

  const totalQuantityProducts =
    productsQuantity &&
    Object.values(productsQuantity).reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);

  for (let key in productsQuantity) {
    productsQuantity[key].percentage = `${(
      (productsQuantity[key].quantity / totalQuantityProducts) *
      100
    ).toFixed(0)}`;
  }

  const top3Products =
    productsQuantity &&
    Object.entries(productsQuantity)
      .sort((a, b) => b[1].percentage - a[1].percentage)
      .slice(0, 3);

  // //Top categories calculation
  const categoriesQuantity = allProducts?.reduce((prev, curr) => {
    if (!prev[curr.category]) {
      prev[curr.category] = {
        quantity: 0,
      };
    }
    prev[curr.category].quantity += curr.quantity;
    return prev;
  }, {});

  const totalQuantityCategories =
    categoriesQuantity &&
    Object.values(categoriesQuantity).reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);

  for (let key in categoriesQuantity) {
    categoriesQuantity[key].percentage = `${(
      (categoriesQuantity[key].quantity / totalQuantityCategories) *
      100
    ).toFixed(0)}`;
  }

  const top3Categories =
    categoriesQuantity &&
    Object.entries(categoriesQuantity)
      .sort((a, b) => b[1].percentage - a[1].percentage)
      .slice(0, 3);

  // //Chart calculation
  const listsWithMonth = lists?.map((list) => {
    return Object.assign({}, list, {
      month: months[new Date(list.createdAt).getMonth()],
    });
  });
  const productsGroupedByMonth = listsWithMonth?.reduce(
    (acc, { month, products }) => {
      products.forEach(({ quantity }) => {
        acc[month] = (acc[month] || 0) + quantity;
      });
      return acc;
    },
    {}
  );

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  ChartJS.defaults.font.family = "Quicksand, sans-serif";
  ChartJS.defaults.font.size = 16;

  const options = {
    responsive: true,

    scales: {
      y: {
        border: {
          dash: [4, 4],
        },
      },
      x: {
        border: {
          dash: [4, 4],
        },
      },
    },

    plugins: {
      display: true,
      legend: {
        onHover: (e) => (e.chart.canvas.style.cursor = "pointer"),
        onLeave: (e) => (e.chart.canvas.style.cursor = "default"),
        padding: 20,
        position: "bottom",

        labels: {
          font: {
            weight: "bold",
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        padding: 12,
        usePointStyle: true,
        titleAlign: "right",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "items",
        pointStyle: "rectRounded",
        usePointStyle: true,
        pointStyleWidth: 10,
        data:
          productsGroupedByMonth &&
          Object.entries(productsGroupedByMonth).map((month) => month[1]),
        borderColor: "#f9a109",
        backgroundColor: "#fafafe",
      },
    ],
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="stats">
      <div className="stats-top">
        <div className="stats-top-items">
          <p>Top Items</p>
          {
            <div>
              <div
                style={{ display: `${!top3Products.length ? "grid" : "none"}` }}
              >
                <div className="empty-info" style={{ justifySelf: "start" }}>
                  <SiZeromq className="empty-info-icon" />
                  <span> No items</span>
                </div>
              </div>
            </div>
          }
          {Object.keys(top3Products).map((key) => (
            <div key={key} className="stats-top-items-progress">
              <label>
                <p className="stats-top-items-progress-name">
                  {top3Products[key][0]}
                </p>
                <p> {`${top3Products[key][1].percentage} %`}</p>
              </label>
              <progress
                max="100"
                value={top3Products[key][1].percentage}
              ></progress>
            </div>
          ))}
        </div>
        <div className="stats-top-categories">
          <p> Top Categories</p>
          {
            <div>
              <div
                style={{
                  display: `${!top3Categories.length ? "grid" : "none"}`,
                }}
              >
                <div className="empty-info" style={{ justifySelf: "start" }}>
                  <SiZeromq className="empty-info-icon" />
                  <span> No items</span>
                </div>
              </div>
            </div>
          }
          {Object.keys(top3Categories).map((key) => (
            <div key={key} className="stats-top-categories-progress">
              <label>
                <p className="stats-top-categories-progress-name">
                  {
                    categories.find(
                      (category) => category._id === top3Categories[key][0]
                    )?.name
                  }
                </p>
                <p> {`${top3Categories[key][1].percentage} %`}</p>
              </label>
              <progress
                max="100"
                value={top3Categories[key][1].percentage}
              ></progress>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-chart">
        <p>Monthly Summary</p>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Stats;
