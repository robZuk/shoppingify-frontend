import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context";
import XIcon from "../../assets/xmark.svg";
import { useCreateProductMutation } from "../../slices/productsApiSlice";
import { useCreateCategoryMutation } from "../../slices/categoriesApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import Spinner from "../Spinner";

function NewProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const [createProduct, { data, isSuccess, isLoading, error: productError }] =
    useCreateProductMutation();
  const [createCategory, { data: newCategory, error: categoryError }] =
    useCreateCategoryMutation();
  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    isSuccess && navigate(`/products/${data.product._id}`);
  }, [isSuccess]);

  const { setKeyword } = useContext(Context);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [uploadImageError, setUploadImageError] = useState("");
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  const refComp = useRef();

  useEffect(() => {
    window.outerWidth <= 850 &&
      refComp.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [data?.product._id]);

  useEffect(() => {
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
    errors.note &&
      toast.error("Note is too long (max 170 characters)", {
        toastId: "error2",
        position: "top-center",
        theme: "colored",
      });
    uploadImageError &&
      toast.error(uploadImageError, {
        toastId: "error3",
        position: "top-center",
        theme: "colored",
      });
    errors.category &&
      toast.error("Category is required", {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
  }, [errors, uploadImageError]);

  useEffect(() => {
    setKeyword("");

    newCategory &&
      setCategory({
        name: newCategory.name,
        id: newCategory._id,
      });
  }, [newCategory]);

  useEffect(() => {
    //errors
    categoryError &&
      toast.error(categoryError?.data?.message || categoryError.error, {
        toastId: "error1",
        position: "top-center",
        theme: "colored",
      });
    productError &&
      toast.error(productError?.data?.message || productError.error, {
        toastId: "error2",
        position: "top-center",
        theme: "colored",
      });
  }, [categoryError, productError]);

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
      setUploadImageLoading(false);
      setUploadImageError(
        "Invalid file format. The correct file format is: .jpg .jpeg .png"
      );
    }
  };

  //search category
  const filteredCategories = useMemo(() => {
    return categories?.filter((category) => {
      const regex = new RegExp(`${query}`, "ig");
      return regex.test(category.name);
    });
  }, [query, categories]);

  //create product
  const createNewProduct = () => {
    try {
      createProduct({
        name: name,
        note: note,
        image: image ? image : "/sample.jpg",
        category: category.id,
      });
      isLoading && <Spinner />;
      toast.info("Product added successfully", {
        toastId: "success",
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      toast.error(err?.data?.message || err.error, {
        toastId: "error",
        position: "top-center",
        theme: "colored",
      });
    }
  };

  function onSubmit() {
    createNewProduct();
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
    <div className="new-product-wrapper" ref={refComp}>
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
            onFocus={() => (searchedList.current.style.display = "none")}
            value={name}
            className={`${
              errors.name ? "new-product-name-error" : "new-product-name"
            }`}
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
            onFocus={() => (searchedList.current.style.display = "none")}
            className={`${
              errors.note ? "new-product-note-error" : "new-product-note"
            }`}
          ></textarea>
          <label htmlFor="image">Image (optional)</label>

          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={uploadFileHandler}
            onFocus={() => (searchedList.current.style.display = "none")}
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
                  createCategory({ name: newCategoryName });
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
        <div className="new-product-buttons">
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
      </div>
    </div>
  );
}

export default NewProduct;
