import axios from 'axios'

// FETCH EXPERIENCES
const fetchExperiences = async () => {
  try {
    const response = await axios.get('http://localhost:8000/experiences')
    return response.data
  } catch (error) {
    console.error(`Error getting experiences: ${error}.`)
    throw new Error(`Error getting experiences: ${error}.`)
  }
}

// FETCH EXPERIENCE BY ID
const fetchExperienceById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/experiences/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting experience: ${error}.`)
    throw new Error(`Error getting experience: ${error}.`)
  }
}

// DELETE EXPERIENCE BY ID
const deleteExperienceById = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/experiences/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting experience: ${error}.`)
    throw new Error(`Error deleting experience: ${error}.`)
  }
}

export default fetchExperiences
export { fetchExperienceById, deleteExperienceById }
