import axiosInstance from '../axiosInstance/axiosInstance'

const fetchAllLocation = async () => {
  try {
    const response = await axiosInstance.get('/getalllocation')
    return response.data
  } catch (error) {
    console.error(`Error getting experiences: ${error}.`)
    throw new Error(`Error getting experiences: ${error}.`)
  }
}


export default fetchAllLocation