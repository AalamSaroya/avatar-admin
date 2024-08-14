import { useEffect, useState } from 'react'
import './UserDetails.css'
import { useParams } from 'react-router-dom'
import { fetchUserById } from '../../../utils/services/userServices'

const UserDetails = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUserById(userId)
        setUser(response)
      } catch (error) {
        console.error(`Error getting user details: ${error}.`)
      }
    }
    getUser()
  }, [])

  return (
    <div className="user-details">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export default UserDetails
