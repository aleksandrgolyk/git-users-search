import React, { ReactNode } from "react";

import { Typography } from "antd";
import styles from "./AppLayout.styled";

const { Title } = Typography;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      <Title level={4}>Github user search by Oleksandr Holyk</Title>
      {children}
    </div>
  );
};

export default AppLayout;
