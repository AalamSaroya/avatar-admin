import axiosInstance from '../axiosInstance/axiosInstance'
import toast from 'react-hot-toast'

//  GET ALL REPORTS
const getAllReports = async () => {
  try {
    const response = await axiosInstance.get('/getallreports')
    return response.data
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error(`Error getting reports: ${error}.`)
  }
}
//  GET ALL REPORTS

//  ACCEPT REPORT
const acceptReport = async (id) => {
  try {
    const response = await axiosInstance.patch(`/approved-report/${id}`)
    return response.data
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error(`Error accepting report: ${error}.`)
  }
}
//  ACCEPT REPORT

//  BLOCK REPORT
const blockReport = async (id) => {
  try {
    const response = await axiosInstance.patch(`/block-report/${id}`)
    return response.data
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error(`Error accepting report: ${error}.`)
  }
}
//  BLOCK REPORT

export default getAllReports
export { acceptReport, blockReport }
