import { Route, Routes } from 'react-router-dom'

import { APP_ROUTES } from './appRoutes'
import { AppLayout } from 'components'

const AppNavigator = () => {
  return (
    <AppLayout>
      <Routes>
        {APP_ROUTES.map(({ key, path, element, nested }) => (
          <Route key={key} path={path} element={element}>
            {nested?.map(({ key, path, element }) => (
              <Route key={key} path={path} element={element} />
            ))}
          </Route>
        ))}
      </Routes>
      </AppLayout>
  )
}

export default AppNavigator
