import { useEffect, useState } from 'react'
import './UserDetails.css'
import { useParams } from 'react-router-dom'
import { fetchUserById } from '../../../utils/services/userServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

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
    <>
      <div className="user-details">
        <h1>{user?.name}</h1>
        {/* <p>{user?.email}</p> */}
      </div>
      <div className="user-details box">
        <dl className="d-flex flex-wrap justify-content-between">
          <dt>Username</dt>
          <dd>samar</dd>
          <dt>Email</dt>
          <dd>samar@gmail.com</dd>
          <dt>Avatar</dt>
          <dd>
            <FontAwesomeIcon icon={faCircleCheck} />
          </dd>
        </dl>
      </div>
    </>
  )
}

export default UserDetails
