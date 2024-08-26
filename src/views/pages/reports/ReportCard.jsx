import './ReportCard.css'
import { Button } from 'react-bootstrap'
import { acceptReport, blockReport } from '../../../utils/services/reportServices'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ReportCard = ({ report }) => {
  const navigate = useNavigate()
  const handleAcceptReport = async (id) => {
    try {
      const response = await acceptReport(id)
      if (response) {
        toast.success(response.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      throw new Error(`Error accepting report: ${error}.`)
    }
  }
  const handleBlockReport = async (id) => {
    try {
      const response = await blockReport(id)
      if (response) {
        toast.success(response.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      throw new Error(`Error Blocking report: ${error}.`)
    }
  }
  return (
    <div className="report-container d-flex flex-wrap">
      <div className="r-c-image">
        <img src={report.packageId.avatarImage} alt="" />
      </div>
      <div className="r-c-text">
        <h4>{report.packageId.avatarName}</h4>
        <div className="r-c-buttons d-flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={
              () =>
                (window.location.href = `https://avtar-xi.vercel.app/user/book-experience/${report.packageId._id}`)
              // navigate(`https://avtar-xi.vercel.app/user/book-experience/${report.packageId._id}`)
            }
          >
            View
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleBlockReport(report._id)}>
            Block
          </Button>
          <Button variant="success" size="sm" onClick={() => handleAcceptReport(report._id)}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReportCard
