import { List } from "antd";
import UserSimpleView from "../UserSimpleView";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "store/store";

export const UsersList: React.FC = () => {
  const { ref, inView } = useInView();
  const data = useUserStore();
  const { users, fetchUsers, isLoading, query, error } = data;

  // useEffect(() => {
  //   // Only trigger fetch when in view, not loading, and query is not empty
  //   if (inView && !isLoading && query.trim() !== "") {
  //     fetchUsers(query, 1);
  //   }
  // }, [
  //   data.query,
  //   data.isLoading,
  //   // inView, isLoading, query
  // ]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div ref={ref}>
        <List
          style={{ maxHeight: "300px", overflow: "auto" }}
          dataSource={users}
          renderItem={(user) => (
            <List.Item key={user.id}>
              <UserSimpleView user={user} />
            </List.Item>
          )}
          // ref={ref}
        />
      </div>
    </div>
  );
};
export default UsersList;

// import UserSimpleView from "../UserSimpleView";
// import useUserStore from "store/store";

// const UsersList = () => {
//   const { users, isLoading, error } = useUserStore((state) => ({
//     users: state.users,
//     isLoading: state.isLoading,
//     error: state.error,
//   }));
//   console.log(users);
//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {users.map((user: any) => (
//         <li key={user.id}>
//           <UserSimpleView user={user} />
//         </li>
//       ))}
//     </div>
//   );
// };
