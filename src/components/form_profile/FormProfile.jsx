import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const FormProfile = () => {
  const handleFormProfileSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="form-profile">
      <Form onSubmit={handleFormProfileSubmit}>
        <Form.Group className="mb-3" controlId="formProfileCommission">
          <Form.Label>Commission</Form.Label>
          <Form.Control type="number" placeholder="Enter your commission" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  )
}

export default FormProfile
