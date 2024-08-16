import './Users.css'
import React, { useEffect, useState } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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
  const [usersPerPage, setUsersPerPage] = useState(10)

  const navigate = useNavigate()

  // NAVIGATE TO USER DETAIL PAGE
  const handleUserView = (id) => {
    navigate(`/admin/users/${id}`)
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

  const handleUsersPerPage = (usersCount) => {
    setUsersPerPage(usersCount)
    setCurrentPage(1)
  }

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

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
                <td>ds</td>
                <td>asd</td>
                <td>dsa</td>
                <td className="actions">
                  <Button variant="primary" size="sm">
                    View
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
          totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
          handlePageChange={handlePageChange}
          handleRowsCount={handleUsersPerPage}
        />
      </>

      {loading && <Loader />}
    </>
  )
}

export default Users
