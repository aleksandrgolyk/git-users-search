import UserAdvancedView from "domains/User/components/UserAdvancedView";
import useGetUser from "domains/User/hooks/useGetUser/useGetUser";
import { useParams } from "react-router-dom";

const UserPageView = () => {
  const { id } = useParams<string>();
  const { userData, isLoading, error } = useGetUser(id || "");

  return (
    <UserAdvancedView userData={userData} isLoading={isLoading} error={error} />
  );
};

export default UserPageView;
