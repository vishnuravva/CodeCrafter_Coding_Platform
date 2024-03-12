import React, { useEffect, useState } from "react";
import AdmNav from "../../components/admin/AdmNav";
import { useAppUsers } from "../../context/useAppUsers";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users);
      console.log("all users", response.data.users);
    };
    fetchUsers();
  }, []);
  return (
    <div className="w-full">
      <AdmNav />
      <div className="my-8 flex flex-col justify-center items-center w-full">
        <h1 className="my-4 text-lg sm:text-3xl font-bold">CodeCrafter Users</h1>
        <table className="w-10/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="px-6 py-3">
                Avatar
              </th> */}
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Challenges Solved
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user?.username}
                </td>
                <td className="px-6 py-4">{user?.country}</td>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="px-6 py-4">{user?.solved_challenges.length}</td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
