import axios from "axios";

const API_BASE_URL = "http://localhost:3010";

export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Devuelve la ruta del archivo y el tipo
  } catch (error) {
    throw new Error("Error al subir el archivo:", error.response.data);
  }
};

export const sendCandidateData = async (candidateData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/candidates`,
      candidateData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Error al enviar datos del candidato:",
      error.response.data
    );
  }
};

/**
 * Updates the interview stage of a candidate
 * @param {string|number} candidateId - The ID of the candidate
 * @param {string|number} applicationId - The ID of the application
 * @param {string|number} interviewStepId - The ID of the new interview step
 * @returns {Promise<Object>} - The updated candidate data
 */
export const updateCandidateStage = async (
  candidateId,
  applicationId,
  interviewStepId
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/candidates/${candidateId}`,
      {
        applicationId: applicationId.toString(),
        currentInterviewStep: interviewStepId.toString(),
      }
    );

    console.log("API response for updateCandidateStage:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating candidate stage:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Error updating candidate stage"
    );
  }
};
