import {UserPageView, UsersSearch} from 'pages/App'

import { APP_PATHS } from '__constants__/paths'
import { Navigate } from 'react-router-dom'

const { USERS_SEARCH, USER_SHOW } = APP_PATHS

export const APP_ROUTES = [
  { key: USERS_SEARCH, path: USERS_SEARCH, element: <UsersSearch /> },
  { key: USER_SHOW, path: USER_SHOW, element: <UserPageView /> },
  { key: '/', path: '/', element: <Navigate to={USERS_SEARCH} /> }

]

export default APP_ROUTES
