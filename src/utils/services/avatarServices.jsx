import axiosInstance from "../axiosInstance/axiosInstance";
import toast from "react-hot-toast";

// FETCH AVATARS
const fetchAvatars = async () => {
  try {
    const response = await axiosInstance.get(`/getallavatar?items_per_page=10&pg=1`)
    return response.data
  } catch (error) {
    console.error(`Error getting Avatars: ${error}.`)
    throw new Error(`Error getting Avatars: ${error}.`)
  }
}

// FETCH AVATAR BY ID
const fetchAvatarById = async (id) => {
  try {
    const response = await axiosInstance.get(`/avatar/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting avatar: ${error}.`)
    throw new Error(`Error getting avatar: ${error}.`)
  }
}

// DELETE AVATAR BY ID
const deleteAvatarById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/avatar-delete/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting user: ${error}.`)
    throw new Error(`Error deleting user: ${error}.`)
  }
}





export default fetchAvatars
export { fetchAvatarById, deleteAvatarById }
