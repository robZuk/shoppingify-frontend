import React, { useRef, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { FcSearch } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../../features/products/productSlice";
import { Context } from "../../context";
import XIcon from "../../assets/xmark.svg";

function Search() {
  const inputRef = useRef();
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { keyword, setKeyword } = useContext(Context);

  useEffect(() => {
    location.pathname !== "/search" && setKeyword("");
  }, []);

  const searchProduct = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchProduct();
    }
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        type="search"
        placeholder="search item"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyPress}
        maxLength={15}
      ></input>
      <FcSearch className="search-icon" />

      {keyword && (
        <img
          src={XIcon}
          alt="close"
          className="search-close"
          onClick={() => {
            navigate("/");
            dispatch(getProducts());
            setKeyword("");
          }}
        />
      )}
    </div>
  );
}

export default Search;
