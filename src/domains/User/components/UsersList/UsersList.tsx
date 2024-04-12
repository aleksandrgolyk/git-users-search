import { List, Spin } from "antd";

import UserSimpleView from "../UserSimpleView";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "store/store";

export const UsersList: React.FC = () => {
  const { ref, inView } = useInView();
  const { users, fetchUsers, isLoading, query, error, hasMore, page } =
    useUserStore();

  // Effect to trigger loading more users when the last element is in view
  // added timeout to prevent to many requests and get git restrictions
  useEffect(() => {
    // Only run the timeout if all conditions are met
    if (inView && !isLoading && hasMore && query) {
      const delayInMs = 500; // Delay in milliseconds
      const timeoutId = setTimeout(() => {
        fetchUsers(query, page);
      }, delayInMs);

      // Cleanup function to cancel the timeout if the effect runs again
      return () => clearTimeout(timeoutId);
    }
  }, [inView, isLoading, hasMore, query, page, fetchUsers]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      {/* </div> */}
      {error && <p>Error: {error}</p>}
      {/* <div> */}
      <Spin spinning={isLoading}>
        <List
          style={{ maxHeight: "300px", overflow: "auto" }}
          dataSource={users}
          renderItem={(user, index) => (
            <List.Item
              key={user.id}
              ref={index === users.length - 1 ? ref : null}
            >
              <UserSimpleView user={user} />
            </List.Item>
          )}
        />
      </Spin>
      {/* </div> */}
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
