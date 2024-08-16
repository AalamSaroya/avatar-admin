import axiosInstance from "../axiosInstance/axiosInstance";
import toast from "react-hot-toast";
// FETCH USERS
const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/getalluser?items_per_page=10&pg=1')
    return response.data
  } catch (error) {
    console.error(`Error getting users: ${error}.`)
    throw new Error(`Error getting users: ${error}.`)
  }
}

// FETCH USER BY ID
const fetchUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting user: ${error}.`)
    throw new Error(`Error getting user: ${error}.`)
  }
}

// DELETE USER BY ID
const deleteUserById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user-delete/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting user: ${error}.`)
    throw new Error(`Error deleting user: ${error}.`)
  }
}

export default fetchUsers
export { fetchUserById, deleteUserById }
