import axiosInstance from '../axiosInstance/axiosInstance'
// FETCH USERS
const fetchAllUsers = async (payload) => {
  let { page, items_per_page } = payload
  try {
    const response = await axiosInstance.get(
      `/getalluser?items_per_page=${items_per_page}&pg=${page}`,
    )
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
// SEARCH USER BY USERNAME AND EMAIL
const searchUser = async (query) => {
  try {
    const response = await axiosInstance.get(`/user-search?query=${query}`)
    return response.data
  } catch (error) {
    console.error(`Error getting user: ${error}.`)
    throw new Error(`Error getting user: ${error}.`)
  }
}
export default fetchAllUsers
export { fetchUserById, deleteUserById,searchUser }
