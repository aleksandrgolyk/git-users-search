import "./AppLayout.css";

import React, { ReactNode } from "react";

import { Typography } from "antd";

const { Title } = Typography;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Title className="title" level={4}>
        Github user search by Oleksandr Holyk
      </Title>
      {children}
    </div>
  );
};

export default AppLayout;
