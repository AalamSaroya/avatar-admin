import './Request.css'
import Button from 'react-bootstrap/Button'
import { addAvatar } from '../../../utils/services/avatarServices'

const Requests = () => {
  // ADD AVATAR
  const handleAddAvatar = async (avatar) => {
    try {
      await addAvatar(avatar)
    } catch (error) {
      console.error(`Error adding avatar: ${error}.`)
      throw new Error(`Error adding avatar: ${error}.`)
    }
  }
  return (
    <section className="requests">
      <h2>Avatar Requests</h2>
      <div className="requests-list mt-3">
        <div className="request d-flex align-items-center mb-2">
          <div className="r-name">
            <h6 className="mb-0">John Wick</h6>
          </div>
          <div className="r-email">
            <p className="mb-0">johnwick9895@gmail.com</p>
          </div>
          <div className="request-actions">
            <Button
              variant="success"
              onClick={() =>
                handleAddAvatar({ name: 'john wick', email: 'johnwick9895@gmail.com' })
              }
            >
              Accept
            </Button>
            <Button variant="danger">Delete</Button>
          </div>
        </div>
        <div className="request d-flex align-items-center mb-2">
          <div className="r-name">
            <h6 className="mb-0">John Wick gdsfsd agddsf sf sagg sad asdgf</h6>
          </div>
          <div className="r-email">
            <p className="mb-0">johnwick9895@gmail.com</p>
          </div>
          <div className="request-actions">
            <Button variant="success">Accept</Button>
            <Button variant="danger">Delete</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Requests
