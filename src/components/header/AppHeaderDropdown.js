import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

import { Link } from "react-router-dom"

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end">
        <Link className="dropdown-item" to="/admin/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </Link>
        <Link className="dropdown-item" to="/admin/login">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log out
        </Link>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
