import { Empty, Typography } from "antd";
const { Title } = Typography;

interface NoDataProps {
  description?: string;
}

const NoData: React.FC<NoDataProps> = ({ description }) => {
  return (
    <Empty
      image={"empty.svg"}
      description={
        <Title level={4}>
          {description || "No users with this login to show"}
        </Title>
      }
    />
  );
};

export default NoData;
