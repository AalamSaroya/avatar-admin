import './Experiences.css'
import React, { useEffect, useState } from 'react'
import { Table, Button, Alert, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import Loader from '../../../components/loader/Loader'
import PaginationCommon from '../../../components/pagination_common/PaginationCommon.jsx'
import FormSearch from '../../../components/form_search/FormSearch.jsx'
import DefaultLayout from '../../../layout/DefaultLayout.js'

const Experiences = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(
    parseInt(sessionStorage.getItem('currentPage')) || 1,
  )
  const [experiencesPerPage, setExperiencesPerPage] = useState(10)

  const navigate = useNavigate()

  // NAVIGATE TO EXPERIENCE DETAIL PAGE
  const handleExperienceView = (id) => {
    sessionStorage.setItem('currentPage', currentPage) // Store the current page before navigating
    navigate(`/admin/experiences/${id}`)
  }

  // PAGINATION
  const filteredExperiences = experiences.filter((experience) => {
    return experience.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const indexOfLastExperience = currentPage * experiencesPerPage
  const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage
  const currentExperiences = filteredExperiences.slice(
    indexOfFirstExperience,
    indexOfLastExperience,
  )

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    sessionStorage.setItem('currentPage', pageNumber)
  }

  const handleExperiencesPerPage = (usersCount) => {
    setExperiencesPerPage(usersCount)
    setCurrentPage(1)
  }

  // HANDLE SEARCH FORM SUBMISSION
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  return (
    <>
      <div className="heading-and-search-form">
        <h2>Experiences</h2>
        <FormSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <>
        <div className="table-container">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Created By</th>
                <th>Total Bookings</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>sdsd</td>
                <td>dsada</td>
                <td>dsa</td>
                <td>dsadas</td>
                <td>dasdas</td>
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
          totalPages={Math.ceil(filteredExperiences.length / experiencesPerPage)}
          handlePageChange={handlePageChange}
          handleRowsCount={handleExperiencesPerPage}
        />
      </>

      {loading && <Loader />}
    </>
  )
}

export default Experiences
