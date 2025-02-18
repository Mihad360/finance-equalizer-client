import axios from "axios";

export const getFinanceData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/finance");
    return response.data;
  } catch (error) {
    console.error("Error fetching finance data:", error);
    return null; // Return null or a default value in case of error
  }
};

export const getCategoryStatsData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/category-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching finance data:", error);
    return null; // Return null or a default value in case of error
  }
};

export const getFinanceStatsData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/finance-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching finance data:", error);
    return null; // Return null or a default value in case of error
  }
};

export const getFinanceEditData = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/finance/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching finance data:", error);
    return null; // Return null or a default value in case of error
  }
};
