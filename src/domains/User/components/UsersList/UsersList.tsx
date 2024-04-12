import UserSimpleView from "../UserSimpleView";
import useUserStore from "store/store";

const UsersList = () => {
  const { users, isLoading, error } = useUserStore((state) => ({
    users: state.users,
    isLoading: state.isLoading,
    error: state.error,
  }));
  console.log(users);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.map((user: any) => (
        <li key={user.id}>
          <UserSimpleView user={user} />
        </li>
      ))}
    </div>
  );
};

export default UsersList;
