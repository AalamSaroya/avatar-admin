import './Experiences.css'
import React, { useEffect, useState } from 'react'
import { Table, Button, Alert, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import fetchExperiences, {
  deleteExperienceById,
} from '../../../utils/services/experienceServices.jsx'
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
  const [experiencesPerPage] = useState(10)

  const navigate = useNavigate()

  // GET EXPERIENCES
  const getExperiences = async () => {
    setLoading(true)
    try {
      const response = await fetchExperiences()
      setExperiences(response)
    } catch (error) {
      setApiError(`Error getting experiences: ${error}.`)
      console.error(`Error getting experiences: ${error}.`)
    } finally {
      setLoading(false)
    }
  }

  // NAVIGATE TO EXPERIENCE DETAIL PAGE
  const handleExperienceView = (id) => {
    sessionStorage.setItem('currentPage', currentPage) // Store the current page before navigating
    navigate(`/experiences/${id}`)
  }

  // DELETE EXPERIENCE
  const handleExperienceDelete = async (id) => {
    const confirmExperienceDelete = window.confirm(
      'Are you sure you want to permanently delete this experience?',
    )
    if (!confirmExperienceDelete) {
      return
    }
    try {
      await deleteExperienceById(id)
      getExperiences()
    } catch (error) {
      console.error(`Error deleting experience: ${error}.`)
    }
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

  // HANDLE SEARCH FORM SUBMISSION
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  // RENDER EXPERIENCES
  const renderedExperiences = currentExperiences?.map((experience) => {
    return (
      <tr key={experience.id}>
        <td>{experience.id}</td>
        <td>{experience.name}</td>
        <td>{experience.createdBy}</td>
        <td>{experience.totalBookings}</td>
        <td>{experience.price}</td>
        <td className="actions">
          <Button variant="primary" size="sm" onClick={() => handleExperienceView(experience.id)}>
            View
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleExperienceDelete(experience.id)}>
            Delete
          </Button>
        </td>
      </tr>
    )
  })

  useEffect(() => {
    getExperiences()
  }, [])

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
      {!loading && apiError && <Alert variant="danger">{apiError}</Alert>}
      {!loading && renderedExperiences?.length === 0 && !apiError && (
        <Alert variant="warning">No Experiences Found!</Alert>
      )}
      {!loading && renderedExperiences?.length > 0 && (
        <>
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
            <tbody>{renderedExperiences}</tbody>
          </Table>
          <PaginationCommon
            currentPage={currentPage}
            totalPages={Math.ceil(filteredExperiences.length / experiencesPerPage)}
            handlePageChange={handlePageChange}
          />
        </>
      )}
      {loading && <Loader />}
    </>
  )
}

export default Experiences
