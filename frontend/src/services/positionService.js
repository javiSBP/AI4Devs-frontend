import axios from "axios";

const API_BASE_URL = "http://localhost:3010";

/**
 * Fetches the interview flow for a specific position
 * @param {string|number} positionId - The ID of the position
 * @returns {Promise<Object>} - The interview flow data
 */
export const getInterviewFlow = async (positionId) => {
  const url = `${API_BASE_URL}/position/${positionId}/interviewflow`;
  console.log(`Making API request to: ${url}`);

  try {
    const response = await axios.get(url);
    console.log("API response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching interview flow:", error);
    console.error("Full error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: url,
    });
    throw new Error(
      error.response?.data?.message || "Error fetching interview flow"
    );
  }
};

/**
 * Fetches candidates for a specific position
 * @param {string|number} positionId - The ID of the position
 * @returns {Promise<Array>} - Array of candidates
 */
export const getPositionCandidates = async (positionId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/position/${positionId}/candidates`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching position candidates:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching position candidates"
    );
  }
};
