import { List, Spin } from "antd";

import UserSimpleView from "../UserSimpleView";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/store";

export const UsersList: React.FC = () => {
  const { ref, inView } = useInView();
  const { users, fetchUsers, isLoading, query, error, hasMore, page } =
    useUserStore();
  const navigate = useNavigate();

  // Effect to trigger loading more users when the last element is in view
  // added timeout to prevent to many requests and get git restrictions
  useEffect(() => {
    // Only run the timeout if all conditions are met
    if (inView && !isLoading && hasMore && query) {
      const delayInMs = 800; // Delay to prevent to many call if user will pull scroll manually to fast
      const timeoutId = setTimeout(() => {
        fetchUsers(query, page);
      }, delayInMs);

      // Cleanup function to cancel the timeout if the effect runs again
      return () => clearTimeout(timeoutId);
    }
  }, [inView, isLoading, hasMore, query, page, fetchUsers]);
  console.log(users);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      {error && <p>Error: {error}</p>}
      <Spin spinning={isLoading}>
        <List
          style={{
            maxHeight: "300px",
            overflow: "auto",
            border: "1px solid red",
          }}
          dataSource={users}
          locale={{
            emptyText: !Boolean(query) ? "Enter user login" : "No users found",
          }}
          renderItem={(user, index) => (
            <List.Item
              key={user.id}
              ref={index === users.length - 1 ? ref : null}
              onClick={() => navigate(`/users/${user.login}`)}
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
