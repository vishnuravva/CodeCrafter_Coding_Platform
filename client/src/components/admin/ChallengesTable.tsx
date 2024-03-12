import { useCallback, useEffect, useState } from "react";
import { useChallenge } from "../../context/useChallenges";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { ChevronLeftCircle, Pencil, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { AlertDialogDemo, DeleteChallenge } from "../DeleteChallenge";

const ChallengesTable = () => {
  const { challenges } = useChallenge();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChallenges = challenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // console.log("objet");
    // Simulate loading delay with setTimeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [challenges]);

  const deleteChallenge = useCallback(async (challengeid) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/deletechallenge/${challengeid}`
      );
      toast({
        title: "Challenge Deleted Successfully",
      });
    } catch (error) {
      toast({
        variant: "destructuve",
        title: "Error deleting challenge",
        description: "Please try again",
      });
    }
  }, []);

  return (
    <div className="flex flex-col w-full space-y-4 sm:space-y-0 items-center justify-center pb-4">
      <div className="flex  items-center justify-between w-9/12">
      
        <div className="relative my-4">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search challenges"
          />
        </div>
        <Link to={"/admin/addchallenges"}>
          <Button variant={"outline"}>
            Add Challenge
            <PlusCircle className="ml-4" />
          </Button>
        </Link>
      </div>
      <table className="w-[20%] sm:w-9/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="px-6 py-3">
              Status
            </th> */}
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Category
            </th> */}
            <th scope="col" className="px-6 py-3">
              Difficulty
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="w-9/12">
          {isLoading
            ? Array(filteredChallenges.length)
                .fill(null)
                .map((_, idx) => (
                  // <tr
                  //   key={`skeleton-${idx}`}
                  //   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                  // >
                  <tr
                    key={`skeleton-${idx}`}
                    className="border-b  hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* <td className="px-6 py-4">
                      <Skeleton className="w-full h-2" />
                    </td> */}
                    <td className="px-6 py-4">
                      <Skeleton className="w-full h-2" />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Skeleton className="w-full h-2" />
                    </th>
                    <td className="px-6 py-4">
                      <Skeleton className="w-full h-2" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="w-full h-2" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="w-full h-2" />
                    </td>
                  </tr>
                ))
            : filteredChallenges?.map((challenge, idx) => (
                <tr
                  key={challenge?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                >
                  {/* <td className="px-6 py-4">
                    {challenge?.status ? (
                      <CheckCircle color="green" />
                    ) : (
                      <Circle color="green" />
                    )}
                  </td> */}
                  <td className="px-6 py-4">{idx + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                      {challenge?.title}
                  </th>
                  {/* <td className="px-6 py-4">Arrays / Strings</td> */}
                  <td
                    className={`${
                      challenge.difficulty == "Easy"
                        ? "text-[#00AD7C] font-bold"
                        : challenge.difficulty == "Medium"
                        ? "text-[#FFA11B] font-bold"
                        : "text-[#FF3750] font-bold"
                    } px-6 py-4`}
                  >
                    {challenge?.difficulty}
                  </td>
                  <td className="flex items-center flex-wrap px-6 py-4">
                    {/* <span className="cursor-pointer" onClick={() => {}}>
                      <Pencil />
                    </span> */}
                    <span onClick={() => {}} className="cursor-pointer">
                      <DeleteChallenge
                        challengeid={challenge?._id}
                        deleteChallenge={deleteChallenge}
                      />
                    </span>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChallengesTable;
