// interface UserListInterface {
//   query: string;
//   users: any[];

// }
// const UsersList: React.FC<UserListInterface> = ({query, users}) => {
//   return (
//     {users.map((user: any) => (
//       <li key={user.id}>
//         <UserSimpleView user={user} />
//         {/* <img src={user.avatar_url} alt={user.login} />
//         <a href={``}>{user.login}</a> */}
//       </li>
//     ))}
//   )
// }

import UserSimpleView from "../UserSimpleView";
// export default UsersList
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
          {/* <img src={user.avatar_url} alt={user.login} />
              <a href={``}>{user.login}</a> */}
        </li>
      ))}
    </div>
  );
};

export default UsersList;
