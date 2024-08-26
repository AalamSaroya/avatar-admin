import { Col, Row } from 'react-bootstrap'
import ReportCard from './ReportCard'
import getAllReports from '../../../utils/services/reportServices'
import { useEffect, useState } from 'react'

const Reports = () => {
  const [reports, setReports] = useState([])
  const renderedReports = reports?.map((report) => {
    return (
      <Col lg={4} key={report._id}>
        <ReportCard report={report} />
      </Col>
    )
  })
  useEffect(() => {
    //FETCH REPORTS
    const fetchReports = async () => {
      try {
        const reports = await getAllReports()
        setReports(reports.data)
      } catch (error) {
        throw new Error(`Error fetching reports: ${error}.`)
      }
    }
    fetchReports()
  }, [])
  return (
    <div className="reports">
      <h2>Reports</h2>
      <div className="reports-wrap mt-3">
        <Row className="row-gap-4">{renderedReports}</Row>
      </div>
    </div>
  )
}

export default Reports
