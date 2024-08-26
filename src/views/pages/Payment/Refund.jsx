import '../users/Users.css'
import React, { useEffect, useState } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../../../components/loader/Loader'
import FormSearch from '../../../components/form_search/FormSearch'
import Pagination from '../../../components/pagination_common/Pagination'
import { getRefunds } from '../../../utils/services/avatarServices'

const Refund = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await getRefunds();
      setLoading(false)
      if (response?.success) {
        console.log(response.data)
        setUserData(response.data)
        
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Failed to load dashboard data')
    }

  }
  // Handle search form submission

  console.log(userData,'jksjd');

  useEffect(() => {
    fetchDashboardData()
  }, [currentPage, itemsPerPage])

  const viewSingleUser = (id) => {
    console.log(id);
   
    navigate(`/admin/users/${id}`)
  }

  const DeleteUserById = async (userId) => {
    try {
      setLoading(true)
      const response = await deleteUserById(userId)
      if (response?.success) {
        fetchDashboardData()
        toast.success('User deleted successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error deleting user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="heading-and-search-form">
        <h2>Experiences Cancelled By Avatar</h2>
      
      </div>

      <div className="table-container">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Experience Name</th>
              <th>Avatar Name</th>
              <th>Avatar Email</th>
              <th>Amount to Refund</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.length !== 0 ? (
              userData.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{user.experienceName}</td>
                  <td>{user.avatarName
                  }</td>
                  <td>{user.avatarEmail}</td>
                  <td>{user.amount}</td>
                  <td className="actions">
                    <Button variant="primary" size="sm" onClick={() => viewSingleUser(user.id)}>
                      View Case
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => DeleteUserById(user.id)}>
                      Refund
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

export default Refund