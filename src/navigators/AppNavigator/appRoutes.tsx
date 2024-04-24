import { UserPageView, UsersSearch } from "pages";

import { APP_PATHS } from "__constants__/paths";
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

const { USERS_SEARCH, USER_SHOW } = APP_PATHS;

interface RouterConfig {
  key: string;
  path: string;
  element: ReactElement;
}

export const APP_ROUTES: RouterConfig[] = [
  { key: USERS_SEARCH, path: USERS_SEARCH, element: <UsersSearch /> },
  { key: USER_SHOW, path: USER_SHOW, element: <UserPageView /> },
  { key: "/", path: "/", element: <Navigate to={USERS_SEARCH} /> },
];

export default APP_ROUTES;
