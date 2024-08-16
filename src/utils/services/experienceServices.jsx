import axiosInstance from "../axiosInstance/axiosInstance";
import toast from "react-hot-toast";
// FETCH EXPERIENCES
const fetchExperiences = async () => {
  try {
    const response = await axiosInstance.get('/getallexperience?items_per_page=10&pg=1')
    return response.data
  } catch (error) {
    console.error(`Error getting experiences: ${error}.`)
    throw new Error(`Error getting experiences: ${error}.`)
  }
}

// FETCH EXPERIENCE BY ID
const fetchExperienceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/experience/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting experience: ${error}.`)
    throw new Error(`Error getting experience: ${error}.`)
  }
}

// DELETE EXPERIENCE BY ID
const deleteExperienceById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/experience-delete/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting experience: ${error}.`)
    throw new Error(`Error deleting experience: ${error}.`)
  }
}

export default fetchExperiences
export { fetchExperienceById, deleteExperienceById }
