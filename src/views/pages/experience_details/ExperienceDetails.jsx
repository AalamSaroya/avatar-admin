import './ExperienceDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchExperienceById } from '../../../utils/services/experienceServices'
import { Row, Col } from 'react-bootstrap'
import imageAvatar from '../../../assets/images/avatars/avatar.jpg'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

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
    <>
      {/* <div className="experience-details">
        <h1>{experience?.name}</h1>
        <p>{experience?.createdBy}</p>
        <p>{experience?.totalBookings}</p>
        <p>{experience?.price}</p>
      </div> */}
      <div className="experience-details">
        <Row>
          <Col md={4}>
            <div className="e-d-image">
              <img src={imageAvatar} alt="" />
            </div>
          </Col>
          <Col md={8}>
            <div className="e-d-text">
              <h1 className="mb-4">{experience?.name}</h1>
              <Table hover>
                <tbody>
                  <tr>
                    <th>Experience Name</th>
                    <td>Shimla</td>
                  </tr>
                  <tr>
                    <th>Amounts per minute</th>
                    <td>20</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>Algeria</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>Adrar</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>Aoulef</td>
                  </tr>
                  <tr>
                    <th>Bookings</th>
                    <td>28</td>
                  </tr>
                  <tr>
                    <th>Likes</th>
                    <td>40</td>
                  </tr>
                </tbody>
              </Table>
              <div className="rating">
                <h5>Rating</h5>
                <div className="rating-stars d-flex flex-wrap">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="reviews mt-4">
          <h5 className="mb-3">Reviews</h5>
          <Swiper
            className="swiper-reviews"
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>Review 1</SwiperSlide>
            <SwiperSlide>Review 2</SwiperSlide>
            <SwiperSlide>Review 3</SwiperSlide>
            <SwiperSlide>Review 4</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default ExperienceDetails
