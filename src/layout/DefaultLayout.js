import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true" && window.location.href !== "http://localhost:3000/login#/forgot-password") {
    window.location.href = "http://localhost:3000/login#/login"
  }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
