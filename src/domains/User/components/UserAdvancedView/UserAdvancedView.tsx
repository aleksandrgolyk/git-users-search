import { Avatar } from "antd";

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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found.</div>;
  console.log(userData);
  // Render user data here
  return (
    <div>
      <Avatar src={userData.avatar_url} size={260} />
      <h1>{userData.login}</h1>
      followers: <h1>{userData.followers}</h1>
      following: <h1>{userData.following}</h1>
      company: <h1>{userData.company}</h1>
      email: <h1>{userData.email}</h1>
      blog: <h1>{userData.blog}</h1>
    </div>
  );
};

export default UserAdvancedView;
