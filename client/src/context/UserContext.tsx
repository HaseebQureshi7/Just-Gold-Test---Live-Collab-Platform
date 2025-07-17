import { createContext, ReactNode, useState } from "react";
import { IUser } from "../types/IUser";

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const userContext = createContext<IUserContext | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
