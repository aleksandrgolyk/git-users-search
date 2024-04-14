import { Avatar, Card, Col, Empty, Row, Spin, Typography } from "antd";

import { Nodata } from "components/lib";

const { Text } = Typography;
interface UserAdvancedViewProps {
  userData: {
    login: string;
    avatar_url: string;
    followers: number;
    following: number;
    company?: string;
    email?: string;
    blog?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const UserAdvancedView: React.FC<UserAdvancedViewProps> = ({
  userData,
  isLoading,
  error,
}) => {
  if (isLoading) return <Spin />;
  if (error && !isLoading)
    return <Empty image={"error.svg"} description={error} />;

  if (!userData) return <Nodata />;
  const userDetails = [
    {
      label: "Followers",
      value: userData.followers,
      defaultValue: "Not available",
    },
    {
      label: "Following",
      value: userData.following,
      defaultValue: "Not available",
    },
    {
      label: "Company",
      value: userData.company,
      defaultValue: "No company info provided",
    },
    {
      label: "Email",
      value: userData.email,
      defaultValue: "No email provided",
    },
    { label: "Blog", value: userData.blog, defaultValue: "No blog info" },
  ];

  return (
    <Card loading={isLoading}>
      <Row gutter={24}>
        <Col>
          <Avatar src={userData.avatar_url} size={260} />
        </Col>
        <Col>
          <h1>{userData.login}</h1>
          {userDetails.map((item, index) => (
            <div key={index}>
              <Text>{item.label}:</Text>{" "}
              <Text>{item.value || item.defaultValue}</Text>
            </div>
          ))}
        </Col>
      </Row>
    </Card>
  );
};

export default UserAdvancedView;
