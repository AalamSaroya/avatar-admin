import './PaginationCommon.css'

import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationCommon = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages).keys()].map((number) => (
        <Pagination.Item
          key={number + 1}
          active={number + 1 === currentPage}
          onClick={() => handlePageChange(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

export default PaginationCommon
