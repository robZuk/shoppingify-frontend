import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import Bootle from "../../../assets/bootle.svg";
import Shopping from "../../../assets/shopping.svg";
import { MdModeEdit } from "react-icons/md";
import { SiZeromq } from "react-icons/si";
import ProductOnList from "./ProductOnList";
import ListProperty from "./ListProperty";
import { useGetCategoriesQuery } from "../../../slices/categoriesApiSlice";
import { editListName } from "../../../slices/listSlice";

function List() {
  const [name, setName] = useState("");
  const [editName, setEditName] = useState(false);
  const [listSaved, setListSaved] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: categories } = useGetCategoriesQuery();

  const { products, name: listName } = useSelector((state) => state.list);

  const selectedCategories = [...new Set(products?.map((obj) => obj.category))];

  return (
    <>
      <div className="list">
        <div className="list-new-item">
          <img className="list-new-item-image" src={Bootle} alt="" />
          <p className="list-new-item-text">Didn't find what you need?</p>
          <button
            className="list-new-item-button"
            onClick={() => {
              navigate("products/new-product");
            }}
          >
            Add item
          </button>
        </div>
        <div
          className="list-products"
          style={{
            overflowY: `${selectedCategories.length ? "scroll" : "visible"}`,
          }}
        >
          <div className="list-products-title">
            {listName ? listName : "Shopping list"}
            {listName && (
              <MdModeEdit
                onClick={() => setEditName(true)}
                className={`${
                  editName
                    ? "list-products-edit-icon"
                    : "list-products-edit-icon active"
                }`}
              />
            )}
            <CSSTransition
              in={editName}
              timeout={300}
              classNames="edit-name"
              unmountOnExit
            >
              <div className="list-products-edit">
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="edit name"
                  maxLength={15}
                ></input>
                <div>
                  <button onClick={() => setEditName(false)}>cancel</button>
                  <button
                    onClick={() => {
                      setEditName(false);
                      dispatch(editListName({ name }));
                    }}
                    disabled={!name}
                  >
                    Save
                  </button>
                </div>
              </div>
            </CSSTransition>
          </div>

          <div
            className="list-products-info"
            style={{
              opacity: `${selectedCategories.length ? "0" : "1"}`,
            }}
          >
            <div className="empty-info">
              <SiZeromq className="empty-info-icon" />
              <span> No items</span>
            </div>
          </div>
          <img
            className="list-products-shopping"
            style={{ opacity: `${selectedCategories.length ? "0" : "1"}` }}
            src={Shopping}
            alt=""
          />
          <div>
            {categories?.map((category) => (
              <div key={category._id}>
                <p className="list-products-category">
                  {selectedCategories.includes(category._id) && category.name}
                </p>

                <TransitionGroup className="animation-list">
                  {products
                    ?.filter((product) => product.category === category._id)
                    .map((product) => (
                      <CSSTransition
                        key={product._id}
                        timeout={500}
                        classNames="item"
                      >
                        <div key={product._id}>
                          <ProductOnList product={product} key={product._id} />
                        </div>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ListProperty
        name={name}
        setName={setName}
        listSaved={listSaved}
        setListSaved={setListSaved}
      />
    </>
  );
}

export default List;
