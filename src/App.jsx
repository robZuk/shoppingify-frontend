import React, { useState, lazy } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Products from "./components/main/Products";
import History from "./components/main//History";
import Stats from "./components/main/Stats";
import Main from "./components/main/Main";
import List from "./components/sidebar/list/List";
import Sidebar from "./components/sidebar/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { Context } from "./context";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const NewProduct = lazy(() => import("./components/sidebar/NewProduct"));
const ProductDeleteModal = lazy(() =>
  import("./components/sidebar/list/ProductDeleteModal")
);
const ProductDetail = lazy(() => import("./components/sidebar/ProductDetail"));
const ListDetail = lazy(() => import("./components/sidebar/list/ListDetail"));

function App() {
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  return (
    <>
      <div className="App">
        <ProductDeleteModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
        <Context.Provider value={{ keyword, setKeyword }}>
          <div className="wrapper">
            <Navigation />
            <div className="wrapper-inner">
              <Routes>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route path="*" element={<PrivateRoute />}>
                  <Route path="*" element={<Main />}>
                    <Route index element={<Products />}></Route>
                    <Route path="products/*" element={<Products />}></Route>
                    <Route path="search" element={<Products />}></Route>
                    <Route path="stats" element={<Stats />}></Route>
                    <Route path="history" element={<History />}></Route>
                    <Route path="history/:id" element={<ListDetail />}></Route>
                  </Route>
                </Route>
              </Routes>
              <TransitionGroup>
                <CSSTransition
                  timeout={300}
                  classNames="sidebar"
                  key={location.key}
                  unmountOnExit
                  appear
                >
                  <div style={{ position: "sticky", top: 0 }}>
                    <Routes>
                      <Route path="*" element={<PrivateRoute />}>
                        <Route path="*" element={<Sidebar />}>
                          <Route
                            path="products/:productId"
                            element={
                              <ProductDetail setModalIsOpen={setModalIsOpen} />
                            }
                          ></Route>
                          <Route
                            path="products/new-product"
                            element={<NewProduct />}
                          ></Route>
                          <Route path="*" element={<List />}></Route>
                        </Route>
                      </Route>
                    </Routes>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        </Context.Provider>
      </div>
    </>
  );
}

export default App;
