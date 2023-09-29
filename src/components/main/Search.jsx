import React, { useRef, useEffect, useContext, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context";
import XIcon from "../../assets/xmark.svg";

function Search() {
  const inputRef = useRef();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const { keyword, setKeyword } = useContext(Context);

  useEffect(() => {
    location.pathname !== "/search" && setKeyword("");
    location.pathname !== "/search" && setSearchValue("");
  }, [location.pathname]);

  const searchProduct = () => {
    if (searchValue.trim()) {
      navigate(`/search?keyword=${searchValue}`);
      setKeyword(searchValue);
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
        value={searchValue}
        onChange={(e) => {
          // setKeyword(e.target.value)
          setSearchValue(e.target.value);
        }}
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
            // refetch();
            // dispatch(getProducts());
            setSearchValue("");
            setKeyword("");
          }}
        />
      )}
    </div>
  );
}

export default Search;
