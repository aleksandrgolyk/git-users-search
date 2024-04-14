import { Input } from "antd";
import { UsersList } from "domains/User/components";
import { useGetUsers } from "domains/User/hooks";

const UserSearch: React.FC = () => {
  const { inputValue, setInputValue } = useGetUsers();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Search GitHub Users"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => console.log("Input focused")}
      />
      <UsersList />
    </div>
  );
};
export default UserSearch;
