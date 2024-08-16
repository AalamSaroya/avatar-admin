import './Request.css'
import Button from 'react-bootstrap/Button'

const Requests = () => {
  // ADD AVATAR

  return (
    <section className="requests">
      <h2>Avatar Requests</h2>
      <div className="requests-list mt-3">
        <div className="request d-flex mb-2">
          <div className="r-name">
            <h6 className="mb-0">John Wick</h6>
          </div>
          <div className="r-email">
            <p className="mb-0">johnwick9895@gmail.com</p>
          </div>
          <div className="r-actions">
            <Button
              variant="success"
              size="sm"
             
            >
              Accept
            </Button>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </div>
        </div>
        <div className="request d-flex mb-2">
          <div className="r-name">
            <h6 className="mb-0">John Wick gdsfsd agddsf sf sagg sad asdgf</h6>
          </div>
          <div className="r-email">
            <p className="mb-0">johnwick9895@gmail.com</p>
          </div>
          <div className="r-actions">
            <Button variant="success" size="sm">
              Accept
            </Button>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Requests
