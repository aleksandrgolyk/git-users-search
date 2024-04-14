import "./UsersList.css";

import { Empty, List, Spin, Typography } from "antd";

import NoData from "components/lib/NoData";
import { Nodata } from "components/lib";
import UserSimpleView from "../UserSimpleView";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/store";

const { Title } = Typography;

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

  const handleNavigate = (login: string) => navigate(`/users/${login}`);

  return (
    <>
      {error && <p>Error: {error}</p>}
      <Spin spinning={isLoading}>
        <List
          bordered
          className="list"
          dataSource={users}
          locale={{
            emptyText: <Nodata />,
          }}
          renderItem={(user, index) => (
            <List.Item
              className="listItem"
              key={user.id}
              ref={index === users.length - 1 ? ref : null}
              onClick={() => handleNavigate(user.login)}
            >
              <UserSimpleView user={user} />
            </List.Item>
          )}
        />
      </Spin>
    </>
  );
};
export default UsersList;
