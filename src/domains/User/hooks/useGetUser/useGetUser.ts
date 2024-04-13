import { useEffect, useState } from "react";

interface UserData {
  avatar_url: string;
  login: string;
  followers: number;
  following: number;
  company?: string;
  email?: string;
  blog?: string;
}

interface UseGetUserResult {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const useGetUser = (username: string): UseGetUserResult => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchGitHubUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
          throw new Error(`GitHub API responded with ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const mappedData: UserData = {
          avatar_url: data.avatar_url,
          login: data.login,
          followers: data.followers,
          following: data.following,
          company: data.company,
          email: data.email,
          blog: data.blog,
        };
        setUserData(mappedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubUser();
  }, [username]);

  return { userData, isLoading, error };
};

export default useGetUser;
