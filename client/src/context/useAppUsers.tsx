import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext(null);

export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/user/${localStorage.getItem("userId")}`
      );
      console.log("current user", res.data);
      setUser(res.data);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users);
      console.log("all users", response.data.users);
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAppUsers = () => useContext(UserContext);
