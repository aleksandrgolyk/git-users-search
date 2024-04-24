import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { APP_ROUTES } from "./appRoutes";
import { AppLayout } from "components";

interface RouteConfig {
  key: string;
  path: string;
  element: ReactElement;
  nested?: RouteConfig[];
}
interface NestedRouteConfig {
  key: string;
  path: string;
  element: ReactElement;
}
const AppNavigator: FC = () => {
  return (
    <AppLayout>
      <Routes>
        {APP_ROUTES.map(({ key, path, element, nested }: RouteConfig) => (
          <Route key={key} path={path} element={element}>
            {nested?.map(({ key, path, element }: NestedRouteConfig) => (
              <Route key={key} path={path} element={element} />
            ))}
          </Route>
        ))}
      </Routes>
    </AppLayout>
  );
};

export default AppNavigator;
