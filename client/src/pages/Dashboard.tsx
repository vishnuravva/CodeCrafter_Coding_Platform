import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { useAppUsers } from "../context/useAppUsers";
import { useChallenge } from "../context/useChallenges";
import { ArrowUp10, Award, Badge, Coins, LocateIcon } from "lucide-react";
import { useSubmissions } from "../context/useSubmissions";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAppUsers();
  const [progress, setProgress] = useState(0);
  const { challenges } = useChallenge();
  
 

  const totalPoints = user?.user?.solved_challenges?.reduce(
    (total, challenge) => {
      return total + challenge.point;
    },
    0
  );
  useEffect(() => {
    const totalChallenges = challenges.length;
    // const solvedChallenges = challenges.filter(
    //   (challenge) => challenge.solved
    // ).length;
    const calculatedProgress =
      (user?.user?.solved_challenges?.length / totalChallenges) * 100;
    setProgress(calculatedProgress);
  }, [challenges, user?.user?.solved_challenges?.length]);


 

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Header />
      <div className="flex md:flex-row justify-betwen space-x-4 items-center sm:w-full lg:w-[70%] p-4">
        <div className="left p-4 border rounded-lg flex flex-col">
          <div className="flex items-center">
            <img
              src={user?.user?.avatar}
              alt="profile"
              width={150}
              height={150}
              className="border rounded-lg"
            />
            <div className="flex flex-col ml-4">
              <h1 className="font-bold">{user?.user?.email}</h1>
              <p className="text-gray-400 font-bold">{user?.user?.username}</p>
              <h2 className="dark:text-gray-300 font-bold my-4 flex">
                <LocateIcon />
                <span className="ml-2">{user?.user?.country}</span>
              </h2>
            </div>
          </div>
          {/* <Button className="my-4">Edit Profile</Button> */}
        </div>
        <div className="right rounded-lg flex-1 p-4 border flex md:flex-row justify-between space-x-2 ">
          <div className="problems_status flex flex-col flex-1">
            <div className="flex items-center">
              <ArrowUp10 width={100} height={100} />
              <div className="flex flex-col ml-4">
                <h1 className="font-bold md:text-2xl text-xl">
                  Solved Problems
                </h1>
                <p className="text-gray-400 font-bold md:text-2xl text-lg">
                  {user?.user?.solved_challenges?.length} / {challenges.length}
                </p>
              </div>
            </div>
            <Progress value={progress} className="w-full my-4" />
            {/* <div className="w-full flex font-bold md:text-xl text-lg justify-center">
              0 / {challenges.length}
            </div> */}
          </div>
          <div className="border-l flex justify-evenly items-center flex-1">
            <Award width={100} height={100} />
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold">Points Earned</h1>
              <p className="text-gray-400 font-bold md:text-2xl text-lg">
                {totalPoints}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="submissions my-4 w-8/12">
        <h1 className="my-4 font-bold text-lg sm:text-2xl">
          All My Submissions
        </h1>
        <table className="w-[20%] sm:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Submission Id:</th>
              <th className="px-6 py-3">Submission Date:</th>

              <th className="px-6 py-3">Challenge Id:</th>
              <th className="px-6 py-3">Language</th>

              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <td></td> */}
            {user?.user?.submissions?.map((submission, idx) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                key={idx}
              >
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">{submission?.submittedDate}</td>

                <td className="px-6 py-4">{submission?.challengeId}</td>
                <td className="px-6 py-4">{"Javascript"}</td>

                <td
                  className={`px-6 py-4 font-bold ${
                    submission?.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {submission?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
