import { userStorage } from "@/localStorage";
import { createContext, useEffect, useState } from "react";

interface IUser {
  userId?: string | null;
  userName?: string | null
}

interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | {}>({ userId: null, userName: null });

  useEffect(() => {
    const getUser = async () => {
      const userData = await userStorage.get();
      setUser(userData);
    }
    getUser()
  }, []);

  useEffect(() => {
    const asyncUserData = async () => {
      await userStorage.set(user);
    }
    asyncUserData();
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}