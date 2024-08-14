import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilSpeedometer,
  cilUser,
  cilStar,
  cilUserPlus
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Avatars',
    to: '/avatars',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Experiences',
    to: '/experiences',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Requests',
    to: '/requests',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/login',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    onClick: () => {
      console.log("User Logged out.");
    }
  },
]

export default _nav
