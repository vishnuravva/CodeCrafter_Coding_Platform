import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Rankings = () => {
  const [rankings, setRankings] = useState();
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rankings");
        if (!response.ok) {
          throw new Error("Failed to fetch rankings");
        }
        const data = await response.json();
        setRankings(data.rankings);
        console.log("rankings", rankings);
      } catch (error) {
        console.error("Error fetching rankings:", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="submissions my-4 w-8/12">
        <h1 className="my-4 font-bold text-lg sm:text-2xl">
          Rankings
        </h1>
        <table className="w-[20%] sm:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Username</th>

              <th className="px-6 py-3">Points Earned</th>
            </tr>
          </thead>
          <tbody>
            {rankings?.map((rank, idx) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                key={idx}
              >
                <td className="px-6 py-4">{rank.rank}</td>
                <td className="px-6 py-4">{rank?.email}</td>
                <td className="px-6 py-4">{rank?.username}</td>
                <td className="px-6 py-4">{rank?.pointsEarned}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;
