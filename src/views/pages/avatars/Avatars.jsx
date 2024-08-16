import './Avatars.css'
import React, { useEffect, useState, useRef } from 'react'
import { Button, Alert, Modal, Table, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import FormSearch from '../../../components/form_search/FormSearch'
import PaginationCommon from '../../../components/pagination_common/PaginationCommon'
import LocateAvatars from '../../../components/locate_avatars/LocateAvatars'
import DefaultLayout from '../../../layout/DefaultLayout'

const Avatars = () => {
  const [avatars, setAvatars] = useState([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [editAvatar, setEditAvatar] = useState(null)
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(
    parseInt(sessionStorage.getItem('currentPage')) || 1,
  )
  const [avatarsPerPage, setAvatarsPerPage] = useState(10)

  // NAVIGATE TO AVATAR DETAIL PAGE
  const navigate = useNavigate()
  const handleViewAvatar = (id) => {
    navigate(`/admin/avatars/${id}`)
  }

  // EDIT AVATAR
  const handleEditAvatarModalClose = () => setShowEditAvatarModal(false)
  const handleEditAvatarModalShow = () => setShowEditAvatarModal(true)
  const handleEditAvatar = (avatar) => {
    handleEditAvatarModalShow()
    setEditAvatar(avatar)
  }

  const nameRef = useRef()
  const emailRef = useRef()

  // DELETE AVATAR
  const handleDeleteAvatar = async (id) => {
    const confirmAvatarDelete = window.confirm(
      'Are you sure you want to permanently delete this avatar?',
    )
    if (!confirmAvatarDelete) {
      return
    }
    try {
      await deleteAvatarById(id)
      getAvatars()
    } catch (error) {
      console.error(`Error deleting avatar: ${error}.`)
    }
  }

  // PAGINATION
  const filteredAvatars = avatars.filter((avatar) => {
    return avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const indexOfLastAvatar = currentPage * avatarsPerPage
  const indexOfFirstAvatar = indexOfLastAvatar - avatarsPerPage
  const currentAvatars = filteredAvatars.slice(indexOfFirstAvatar, indexOfLastAvatar)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    sessionStorage.setItem('currentPage', pageNumber)
  }
  const handleAvatarsPerPage = (usersCount) => {
    setAvatarsPerPage(usersCount)
    setCurrentPage(1)
  }

  // HANDLE SEARCH FORM SUBMISSION
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  return (
    <>
      <LocateAvatars />
      <div className="heading-and-search-form">
        <h2>Avatars</h2>
        <FormSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {!loading && apiError && <Alert variant="danger">{apiError}</Alert>}
      {!loading && renderedAvatars.length === 0 && !apiError && (
        <Alert variant="warning">No Avatars Found!</Alert>
      )}
      {!loading && renderedAvatars.length > 0 && (
        <>
          <div className="table-container">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {' '}
                <tr>
                  <td>3432</td>
                  <td>fsdfsdf</td>
                  <td>dsfsdfsdfsd</td>
                  <td className="actions">
                    <Button variant="primary" size="sm">
                      View
                    </Button>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <PaginationCommon
            currentPage={currentPage}
            totalPages={Math.ceil(filteredAvatars.length / avatarsPerPage)}
            handlePageChange={handlePageChange}
            handleRowsCount={handleAvatarsPerPage}
          />
        </>
      )}
      {loading && <Loader />}
      <Modal show={showEditAvatarModal} onHide={handleEditAvatarModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditAvatarFormSubmit}>
            <Form.Group className="mb-3" controlId="EditAvatarFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={nameRef}
                type="text"
                placeholder="Enter Name"
                defaultValue={editAvatar?.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="EditAvatarFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter Email"
                defaultValue={editAvatar?.email}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Avatars
