import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/lists/";

// Get user lists
const getLists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Create new list
const createList = async (listData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, listData, config);

  return response.data;
};

// Update list status
const updateList = async (list, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + list._id, list, config);

  return response.data;
};

// Update list status to cancelled
// const cancelList = async (listId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.put(
//     API_URL + listId,
//     { status: "cancelled" },
//     config
//   );

//   return response.data;
// };

// Get user categories
// const getCategories = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(API_URL, config);

//   return response.data;
// };

// Get user ticket
const getList = async (listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + listId, config);

  return response.data;
};

// Close ticket
// const closeTicket = async (ticketId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.put(
//     API_URL + ticketId,
//     { status: 'closed' },
//     config
//   )

//   return response.data
// }

const categoryService = {
  createList,
  updateList,

  getLists,
  getList,
};

export default categoryService;
