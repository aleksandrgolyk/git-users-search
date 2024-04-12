import "./styles/App.css";

import { UserSearch, UsersList } from "domains/User/components";

function App() {
  return (
    <div className="App">
      <UserSearch />
      <UsersList />
    </div>
  );
}

export default App;
