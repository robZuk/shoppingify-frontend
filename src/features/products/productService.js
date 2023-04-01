import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/products/";

// Create new product
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, productData, config);

  return response.data;
};

// Get user products
const getProducts = async (keyword = "", token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `?keyword=${keyword}`, config);

  return response.data;
};

// Get user product
const getProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + productId, config);

  return response.data;
};

// Delete user product
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + productId, config);

  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
};

export default productService;
