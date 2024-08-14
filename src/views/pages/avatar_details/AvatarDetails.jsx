import { useEffect, useState } from 'react'
import './AvatarDetails.css'
import { useParams } from 'react-router-dom'
import { fetchAvatarById } from '../../../utils/services/avatarServices'

const AvatarDetails = () => {
  const [avatar, setAvatar] = useState(null)
  const { avatarId } = useParams()

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const response = await fetchAvatarById(avatarId)
        setAvatar(response)
      } catch (error) {
        console.error(`Error getting avatar details: ${error}.`)
      }
    }
    getAvatar()
  }, [])

  return (
    <div className="avatar-details">
      <h1>{avatar?.name}</h1>
      <p>{avatar?.email}</p>
    </div>
  )
}

export default AvatarDetails
