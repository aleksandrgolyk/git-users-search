import "./UsersSearch.css";
import "./UsersSearch.styled";

import { Empty, Input, Typography } from "antd";

import { UsersList } from "domains/User/components";
import styles from "./UsersSearch.styled";
import { useGetUsers } from "domains/User/hooks";

const { Title } = Typography;
const UserSearch: React.FC = () => {
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
          imageStyle={styles.imageStyles}
          image={"search.svg"}
          description={<Title level={4}>Type user login to find the one</Title>}
        />
      )}
    </div>
  );
};
export default UserSearch;
