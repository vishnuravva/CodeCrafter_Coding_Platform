import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";

import AdmNav from "../../components/admin/AdmNav";
import axios from "axios";
import { useChallenge } from "../../context/useChallenges";
import { Code, Users } from "lucide-react";

const AdmHome = () => {
  const [users, setUsers] = useState();
  const [submissions, setSubmissions] = useState();
  const { challenges } = useChallenge();
  console.log("challenges admin", challenges);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users);
      console.log("all users", response.data.users);
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchSubmissions = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/allsubmissionslength"
      );
      setSubmissions(response.data.totalSubmissions);
      console.log("all submissions length", response.data.totalSubmissions);
    };
    fetchSubmissions();
  }, []);
  return (
    <div className="main-dashboard w-full">
      <AdmNav />
      <div className="w-full flex flex-col items-center justify-center my-4 p-4">
        <div className="w-10/12 p-4 flex justify-between">
          <div className="border flex items-center p-4 min-w-[400px] rounded-lg hover:drop-shadow-xl">
            <div className="p-4 rounded-full border">
              <Code width={75} height={75} />
            </div>
            <div className="ml-4 flex flex-col">
              <h1 className="text-xl sm:text-3xl font-bold">
                Total Challenges
              </h1>
              <p className="text-lg sm:text-2xl text-gray-400 font-bold">
                {challenges?.length}
              </p>
            </div>
          </div>
          <div className="border flex items-center p-4 min-w-[400px] rounded-lg hover:drop-shadow-xl">
            <div className="p-4 rounded-full border">
              <Users width={75} height={75} />
            </div>
            <div className="ml-4 flex flex-col">
              <h1 className="text-xl sm:text-3xl font-bold">Total Users</h1>
              <p className="text-lg sm:text-2xl text-gray-400 font-bold">
                {users?.length}
              </p>
            </div>
          </div>
          <div className="border flex items-center p-4 min-w-[400px] rounded-lg hover:drop-shadow-xl">
            <div className="p-4 rounded-full border">
              <Send width={75} height={75} />
            </div>
            <div className="ml-4 flex flex-col">
              <h1 className="text-xl sm:text-3xl font-bold">
                Total Submissions
              </h1>
              <p className="text-lg sm:text-2xl text-gray-400 font-bold">
                {submissions}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="my-4">
          <h1>All Submissions</h1>
        </div> */}
      </div>
    </div>
  );
};

export default AdmHome;
