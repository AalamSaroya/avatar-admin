import React from 'react'
import Users from "./views/pages/users/Users"
import UserDetails from "./views/pages/user_details/UserDetails"
import Avatars from "./views/pages/avatars/Avatars"
import AvatarDetails from "./views/pages/avatar_details/AvatarDetails"
import Experiences from "./views/pages/experiences/Experiences"
import ExperienceDetails from "./views/pages/experience_details/ExperienceDetails"
import Requests from "./views/pages/requests/Requests"
import Profile from "./views/pages/profile/Profile"
import Dashboard from "./views/dashboard/Dashboard"

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/users/:userId', element: UserDetails },
  { path: '/avatars', name: 'Avatars', element: Avatars },
  { path: '/avatars/:avatarId', element: AvatarDetails },
  { path: '/experiences/', element: Experiences },
  { path: '/experiences/:experienceId', element: ExperienceDetails },
  { path: '/requests/', element: Requests },
  { path: '/profile/', element: Profile },
]

export default routes
