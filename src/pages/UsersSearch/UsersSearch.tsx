import "./UsersSearch.css";

import { Empty, Input, Typography } from "antd";

import { FC } from "react";
import { UsersList } from "domains/User/components";
import { useGetUsers } from "domains/User/hooks";

const { Title } = Typography;
const UserSearch: FC = () => {
  const { inputValue, setInputValue } = useGetUsers();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="wrapper">
      <Input
        size="large"
        placeholder="Search GitHub Users"
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue ? (
        <UsersList />
      ) : (
        <Empty
          // prefer not to use inline styles but  parent component doesnt take class name
          style={{ height: 200 }}
          image={"search.svg"}
          description={
            <Title level={4}>Type users login to find the one</Title>
          }
        />
      )}
    </div>
  );
};
export default UserSearch;
