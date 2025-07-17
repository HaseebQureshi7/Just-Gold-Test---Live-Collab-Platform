import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserById } from "../api/user/GetUserById";
import { IUser } from "../types/IUser";

function useGetUserById(
  uid: string,
  options?: Partial<UseQueryOptions<IUser, Error>>
) {
  return useQuery<IUser, Error>({
    queryKey: ["user", uid],
    queryFn: () => getUserById(uid).then((res) => res.data),
    enabled: !!uid,
    ...options,
  });
}

export default useGetUserById;
