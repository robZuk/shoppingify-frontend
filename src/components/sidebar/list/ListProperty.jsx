import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateList, reset } from "../../../features/lists/listSlice";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../atoms/ConfirmButton";
import CancelButton from "../../atoms/CancelButton";

function ListProperty({ name, setName, handleCreateList, setListSaved }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.lists);
  const {
    _id,
    name: listName,
    products,
  } = useSelector((state) => state.lists.list);

  return (
    <div className="sidebar-footer">
      {!list.name ? (
        <div className="list-property-save">
          <form className="list-property-save-form" onSubmit={handleCreateList}>
            <input
              className={`${
                list.products.length && name
                  ? "list-property-save-form-input active"
                  : "list-property-save-form-input"
              }`}
              readOnly={list.products.length ? false : true}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter list name"
            ></input>
            <button
              className={`${
                list.products.length && name
                  ? "list-property-save-form-button active"
                  : "list-property-save-form-button"
              }`}
              disabled={list.products.length && name ? false : true}
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="list-property-edit">
          <CancelButton
            text="cancel"
            onClick={() => {
              dispatch(
                updateList({
                  _id,
                  name: listName,
                  products,
                  status: "cancelled",
                })
              );
              navigate("/history");
              dispatch(reset());
              setListSaved(false);
            }}
          />
          <ConfirmButton
            text="Complete"
            bgColor="#56ccf2"
            onClick={() => {
              dispatch(
                updateList({
                  _id,
                  name: listName,
                  products,
                  status: "completed",
                })
              );
              navigate("/history");
              dispatch(reset());
              setListSaved(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ListProperty;
