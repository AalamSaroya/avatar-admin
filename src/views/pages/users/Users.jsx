import './Users.css'
import React, { useEffect, useState } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import Loader from '../../../components/loader/Loader'
import FormSearch from '../../../components/form_search/FormSearch'
import Pagination from '../../../components/pagination_common/Pagination'
import fetchAllUsers from '../../../utils/services/userServices'

const Users = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  // NAVIGATE TO USER DETAIL PAGE
  const handleUserView = (id) => {
    navigate(`/admin/users/${id}`)
  }

  // Handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetchAllUsers({ page: currentPage, items_per_page: itemsPerPage })
      setLoading(false)
      if (response?.success) {
        setUserData(response.data)
        setTotalPages(Math.ceil(response.total_items / itemsPerPage))
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Failed to load dashboard data')
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [currentPage, itemsPerPage])

  const viewSingleUser = (id) => {
    navigate(`/admin/users/${id}`)
  }

  const deleteUser = async (userId) => {
    try {
      const response = await deleteUserById(userId)
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      return response.json()
    } catch (error) {
      console.error(`Error deleting user: ${error}.`)
      throw error
    }
  }

  const deleteUserById = async (userId) => {
    try {
      setLoading(true)
      await deleteUser(userId)
      fetchDashboardData() // Refresh the data after deletion
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Error deleting user')
    } finally {
      setLoading(false) // Ensure loading state is reset
    }
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
            {userData.length !== 0 ? (
              userData.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td className="actions">
                    <Button variant="primary" size="sm" onClick={() => viewSingleUser(user._id)}>
                      View
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteUserById(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <Alert variant="warning">No Users Found!</Alert>
            )}
          </tbody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
          setCurrentPage(1)
          setItemsPerPage(value)
        }}
      />

      {loading && <Loader />}
    </>
  )
}

export default Users
