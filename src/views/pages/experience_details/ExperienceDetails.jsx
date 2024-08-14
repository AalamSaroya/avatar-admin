import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchExperienceById } from '../../../utils/services/experienceServices'

const ExperienceDetails = () => {
  const [experience, setExperience] = useState(null)
  const { experienceId } = useParams()

  useEffect(() => {
    const getExperience = async () => {
      try {
        const response = await fetchExperienceById(experienceId)
        setExperience(response)
      } catch (error) {
        console.error(`Error getting experience details: ${error}.`)
      }
    }
    getExperience()
  }, [])

  return (
    <div className="experience-details">
      <h1>{experience?.name}</h1>
      <p>{experience?.createdBy}</p>
      <p>{experience?.totalBookings}</p>
      <p>{experience?.price}</p>
    </div>
  )
}

export default ExperienceDetails
