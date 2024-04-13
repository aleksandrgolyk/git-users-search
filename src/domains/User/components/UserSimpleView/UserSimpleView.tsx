import React from "react";

interface UserInterFace {
  user: {
    avatar_url: string;
    login: string;
  };
}

const UserSimpleView: React.FC<UserInterFace> = ({ user }) => {
  return (
    <div style={{ display: "flex" }}>
      <img
        style={{ width: 20, height: 20 }}
        src={user.avatar_url}
        alt={user.login}
      />

      <a href={``}>{user.login}</a>
    </div>
  );
};

export default UserSimpleView;