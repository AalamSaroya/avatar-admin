import axios from 'axios'

// FETCH AVATARS
const fetchAvatars = async () => {
  try {
    const response = await axios.get('http://localhost:8000/avatars')
    return response.data
  } catch (error) {
    console.error(`Error getting Avatars: ${error}.`)
    throw new Error(`Error getting Avatars: ${error}.`)
  }
}

// FETCH AVATAR BY ID
const fetchAvatarById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/avatars/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting avatar: ${error}.`)
    throw new Error(`Error getting avatar: ${error}.`)
  }
}

// DELETE AVATAR BY ID
const deleteAvatarById = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/avatars/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting user: ${error}.`)
    throw new Error(`Error deleting user: ${error}.`)
  }
}

// EDIT AVATAR BY ID
const editAvatarById = async (id, avatar) => {
  try {
    const response = await axios.put(`http://localhost:8000/avatars/${id}`, avatar)
    return response.data
  } catch (error) {
    console.error(`Error editing avatar: ${error}.`)
    throw new Error(`Error editing avatar: ${error}.`)
  }
}

// ADD AVATAR
const addAvatar = async (avatar) => {
  try {
    const response = await axios.post('http://localhost:8000/avatars', avatar)
    return response.data
  } catch (error) {
    console.error(`Error adding avatar: ${error}.`)
    throw new Error(`Error adding avatar: ${error}.`)
  }
}

export default fetchAvatars
export { fetchAvatarById, deleteAvatarById, editAvatarById, addAvatar }
