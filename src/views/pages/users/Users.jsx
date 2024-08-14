import './Users.css'
import React, { useEffect, useState } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import fetchUsers, { deleteUserById } from '../../../utils/services/userServices'
import Loader from '../../../components/loader/Loader'
import FormSearch from '../../../components/form_search/FormSearch'
import PaginationCommon from '../../../components/pagination_common/PaginationCommon'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(
    parseInt(sessionStorage.getItem('currentPage')) || 1,
  )
  const [usersPerPage] = useState(10)

  const navigate = useNavigate()

  // GET USERS
  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await fetchUsers()
      setUsers(response)
    } catch (error) {
      setApiError(`Error getting users: ${error}.`)
      console.error(`Error getting users: ${error}.`)
    } finally {
      setLoading(false)
    }
  }

  // NAVIGATE TO USER DETAIL PAGE
  const handleUserView = (id) => {
    navigate(`/users/${id}`)
  }

  // DELETE USER
  const handleUserDelete = async (id) => {
    const confirmUserDelete = window.confirm(
      'Are you sure you want to permanently delete this user?',
    )
    if (!confirmUserDelete) {
      return
    }
    try {
      await deleteUserById(id)
      getUsers()
    } catch (error) {
      console.error(`Error deleting user: ${error}.`)
    }
  }

  // PAGINATION
  const filteredUsers = users?.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    sessionStorage.setItem('currentPage', pageNumber)
  }

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  // RENDER USERS
  const renderedUsers = currentUsers?.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td className="actions">
          <Button variant="primary" size="sm" onClick={() => handleUserView(user.id)}>
            View
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleUserDelete(user.id)}>
            Delete
          </Button>
        </td>
      </tr>
    )
  })

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>
      <div className="heading-and-search-form">
        <h2>Users</h2>
        <FormSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {!loading && apiError && <Alert variant="danger">{apiError}</Alert>}
      {!loading && renderedUsers?.length === 0 && !apiError && (
        <Alert variant="warning">No Users Found!</Alert>
      )}
      {!loading && renderedUsers?.length > 0 && (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderedUsers}</tbody>
          </Table>
          <PaginationCommon
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
            handlePageChange={handlePageChange}
          />
        </>
      )}
      {loading && <Loader />}
    </>
  )
}

export default Users
