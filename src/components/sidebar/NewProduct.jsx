import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context";
import XIcon from "../../assets/xmark.svg";
import { addCategory } from "../../features/categories/categorySlice";
import { addProduct } from "../../features/products/productSlice";

function NewProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const { category: categoryFromRedux, categories } = useSelector(
    (state) => state.categories
  );

  const {
    product,
    isSuccess: productsIsSuccess,
    isError: productsIsError,
    message: productsMessage,
  } = useSelector((state) => state.products);

  const { setKeyword } = useContext(Context);

  const productId = product._id;

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();

  const [uploadImageError, setUploadImageError] = useState("");
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const nameError = useCallback(() => {
    productsIsError &&
      toast.error(productsMessage, {
        toastId: "error",
        position: "top-center",
        theme: "colored",
      });

    errors.name?.type === "required" &&
      toast.error("Name is required", {
        toastId: "error",
        position: "top-center",
        theme: "colored",
      });
    errors.name?.type === "maxLength" &&
      toast.error("Name is too long (max 12 characters)", {
        toastId: "error",
        position: "top-center",
        theme: "colored",
      });
  }, [errors.name]);

  const noteError = useCallback(() => {
    errors.note &&
      toast.error("Note is too long (max 170 characters)", {
        toastId: "error2",
        position: "top-center",
        theme: "colored",
      });
  }, [errors.note]);

  const imageError = useCallback(() => {
    uploadImageError &&
      toast.error(uploadImageError, {
        toastId: "error3",
        position: "top-center",
        theme: "colored",
      });
  }, [uploadImageError]);

  const categoryError = useCallback(() => {
    errors.category &&
      toast.error("Category is required", {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
  }, [errors.category]);

  useEffect(() => {
    setKeyword("");

    categoryFromRedux &&
      setCategory({
        name: categoryFromRedux.name,
        id: categoryFromRedux._id,
      });

    //redirect to product
    productsIsSuccess && productId && navigate(`/products/${productId}`);

    //form errors
    nameError();
    noteError();
    imageError();
    categoryError();
  }, [
    categories,
    product,
    categoryFromRedux,
    nameError,
    noteError,
    imageError,
    categoryError,
  ]);

  //name
  const handleName = (e) => {
    setName(e.target.value);
  };

  //note
  const handleNote = (e) => {
    setNote(e.target.value);
  };

  // image
  const uploadFileHandler = async (e) => {
    setUploadImageError("");
    setUploadImageLoading(true);
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("image", files);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/upload",
        formData,
        config
      );

      setImage(data);
      setUploadImageLoading(false);
    } catch (error) {
      console.error(error);
      setUploadImageLoading(false);
      setUploadImageError(
        "Invalid file format. The correct file format is: .jpg .jpeg .png"
      );
    }
  };

  //search category
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const regex = new RegExp(`${query}`, "ig");
      return regex.test(category.name);
    });
  }, [query, categories]);

  //create product
  const createProduct = () => {
    dispatch(
      addProduct({
        name: name,
        note: note,
        image: image ? image : "/sample.jpg",
        category: category.id,
      })
    );
  };

  function onSubmit() {
    createProduct();
    resetForm();
  }

  const inputCategory = useRef(null);
  const inputSearch = useRef(null);
  const searchedList = useRef(null);

  //reset form
  function resetForm() {
    setName("");
    setNote("");
    setImage("");
    setNewCategoryName("");
    setCategory("");
    setQuery("");
  }

  return (
    <>
      <div className="new-product">
        <p className="new-product-title">Add new item</p>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: true,
              maxLength: 12,
            })}
            type="text"
            name="name"
            placeholder="Enter a name"
            onChange={handleName}
            value={name}
            className={`${
              errors.name ? "new-product-name-error" : "new-product-name"
            }`}
            // required
          ></input>
          <label htmlFor="note">Note (optional)</label>
          <textarea
            {...register("note", {
              maxLength: 170,
            })}
            type="textarea"
            name="note"
            placeholder="Enter a note"
            rows="4"
            value={note}
            onChange={handleNote}
            className={`${
              errors.note ? "new-product-note-error" : "new-product-note"
            }`}
          ></textarea>
          <label htmlFor="image">Image (optional)</label>
          {/* {uploadImageLoading && <Spinner small />} */}
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={uploadFileHandler}
            className={`${
              uploadImageError
                ? image
                  ? "new-product-image-error image-in"
                  : "new-product-image-error image-out"
                : image
                ? "new-product-image image-in"
                : uploadImageLoading
                ? "new-product-image loading"
                : "new-product-image image-out"
            }`}
          ></input>

          <label htmlFor="category">Category</label>
          <input
            {...register("category", {
              required: true,
            })}
            type={`${category.name ? "text" : "hidden"}`}
            name="category"
            placeholder="Enter a category"
            ref={inputCategory}
            value={category?.name || ""}
            className={`${
              errors.category
                ? "new-product-category-error"
                : "new-product-category"
            }`}
            // readOnly
          ></input>
          <img
            style={{ display: `${category.name ? "block" : "none"}` }}
            src={XIcon}
            alt="close"
            className="xmark"
            onClick={() => {
              setCategory("");
              searchedList.current.style.display = "none";
              setQuery("");
            }}
          />

          <input
            className={`${
              errors.category
                ? "new-product-search-error"
                : "new-product-search"
            }`}
            type={`${!category.name ? "search" : "hidden"}`}
            name="search"
            ref={inputSearch}
            placeholder="Enter a category"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => (searchedList.current.style.display = "block")}
            autoComplete="off"
            value={query}
          ></input>
          <div
            className="searched-list"
            ref={searchedList}
            style={{ display: "none" }}
          >
            <ul>
              {filteredCategories &&
                filteredCategories.map((category) => (
                  <li
                    key={category._id}
                    onClick={() => {
                      setValue("category", category.name);
                      setCategory({ name: category.name, id: category._id });
                      searchedList.current.style.display = "none";
                      setNewCategoryName("");
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              <li
                onClick={() => {
                  setValue("category", newCategoryName);
                  dispatch(addCategory({ name: newCategoryName }));
                  searchedList.current.style.display = "none";
                  setNewCategoryName("");
                }}
                style={{
                  display: `${newCategoryName.length >= 5 ? "block" : "none"}`,
                }}
              >
                {newCategoryName}
              </li>
            </ul>
            <input
              placeholder="Add new category"
              maxLength={14}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
                searchedList.current.scrollTo({
                  top: 1000,
                  behavior: "smooth",
                });
              }}
              value={newCategoryName}
              className="add-new-category"
            ></input>
          </div>
        </form>
      </div>
      <div className="new-product-buttons sidebar-footer">
        <button
          type="button"
          className="cancel"
          onClick={() => {
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            resetForm();
          }}
        >
          cancel
        </button>
        <button form="form" className="save" type="submit">
          Save
        </button>
      </div>
    </>
  );
}

export default NewProduct;
