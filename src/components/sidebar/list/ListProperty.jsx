import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { updateList, reset } from "../../../features/lists/listSlice";
import {
  useCreateListMutation,
  useUpdateListMutation,
  useGetListQuery,
} from "../../../slices/listsApiSlice";

import { editListName, reset, setId } from "../../../slices/listSlice";
import { useGetProductsQuery } from "../../../slices/productsApiSlice";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../atoms/ConfirmButton";
import CancelButton from "../../atoms/CancelButton";

function ListProperty({ name, setName, setListSaved }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state);

  const [createList, { isLoading, data: newList }] = useCreateListMutation();
  const [updateList] = useUpdateListMutation();

  useEffect(() => {
    newList && dispatch(setId(newList?._id));
  }, [newList]);

  const { id, name: listName, products } = useSelector((state) => state.list);

  const handleCreateList = (e) => {
    e.preventDefault();

    createList({ name, products });
    dispatch(editListName({ name }));
    setListSaved(true);
    setName("");
  };

  return (
    // <div>ffff</div>
    <div className="sidebar-footer">
      {!list.name ? (
        <div className="list-property-save">
          <form className="list-property-save-form" onSubmit={handleCreateList}>
            <input
              className={`${
                list?.products?.length && name
                  ? "list-property-save-form-input active"
                  : "list-property-save-form-input"
              }`}
              readOnly={list?.products?.length ? false : true}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter list name"
            ></input>
            <button
              className={`${
                list?.products?.length && name
                  ? "list-property-save-form-button active"
                  : "list-property-save-form-button"
              }`}
              disabled={list?.products?.length && name ? false : true}
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
              updateList({
                listId: id,
                name: listName,
                // products: products,
                products: JSON.parse(JSON.stringify(products)),
                status: "cancelled",
              });

              navigate("/history");
              dispatch(reset());
              // refetch();
              setListSaved(false);
            }}
          />
          <ConfirmButton
            text="Complete"
            bgColor="#56ccf2"
            onClick={() => {
              updateList({
                listId: id,
                name: listName,
                products: JSON.parse(JSON.stringify(products)),
                status: "completed",
              });
              navigate("/history");
              dispatch(reset());
              // refetch();
              setListSaved(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ListProperty;
