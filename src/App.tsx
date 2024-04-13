import { Route, Routes } from "react-router-dom";

import AppNavigator from "navigators/AppNavigator";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AppNavigator />} />
    </Routes>
  );
}

export default App;
