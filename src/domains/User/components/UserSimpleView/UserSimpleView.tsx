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
      <img src={user.avatar_url} alt={user.login} />

      <a href={``}>{user.login}</a>
    </div>
  );
};

export default UserSimpleView;
