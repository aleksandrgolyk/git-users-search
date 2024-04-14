import "./UserSimpleView.css";

import { Avatar, List, Typography } from "antd";

const { Text } = Typography;
interface UserInterFace {
  user: {
    avatar_url: string;
    login: string;
  };
}
const UserSimpleView: React.FC<UserInterFace> = ({ user }) => {
  return (
    <List.Item.Meta
      className="listItem"
      avatar={<Avatar src={user.avatar_url} />}
      description={<Text>{user.login}</Text>}
    />
  );
};

export default UserSimpleView;
