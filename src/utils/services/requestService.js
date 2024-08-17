import axiosInstance from '../axiosInstance/axiosInstance'
// FETCH USERS
const fetchAllRequest = async (payload) => {
  let { page, items_per_page } = payload
  try {
    const response = await axiosInstance.get(
      `/getallrequest?items_per_page=${items_per_page}&pg=${page}`,
    )
    return response.data
  } catch (error) {
    console.error(`Error getting users: ${error}.`)
    throw new Error(`Error getting users: ${error}.`)
  }
}

// DELETE USER BY ID
const updateRequestById = async (payload) => {
  try {
    const response = await axiosInstance.patch('/update-request-status', payload)
    return response.data
  } catch (error) {
    console.error(`Error deleting user: ${error}.`)
    throw new Error(`Error deleting user: ${error}.`)
  }
}

export default fetchAllRequest
export { updateRequestById }
