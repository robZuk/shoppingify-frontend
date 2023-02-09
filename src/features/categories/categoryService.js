import axios from "axios";
const API_URL = import.meta.env.VITE_BASE_URL + "/api/categories/";

//Create new category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, categoryData, config);
  return response.data;
};

// Get user categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//Get user category
const getCategory = async (categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + categoryId, config);
  return response.data;
};

const categoryService = {
  createCategory,
  getCategories,
  getCategory,
};

export default categoryService;
