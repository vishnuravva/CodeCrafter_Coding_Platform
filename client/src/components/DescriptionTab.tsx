import { CheckCircle, Circle } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Editor } from "@monaco-editor/react";
import { useAppUsers } from "../context/useAppUsers";

const DescriptionTab = ({ challenge, result, isTestcasesTrue }) => {
  // const allPassed = result
  //   ? result.map((obj) => obj.passed).every((passed) => passed === true)
  //   : false;

  const { user } = useAppUsers();
  const isChallengeSolved = user?.user?.solved_challenges?.some(
    (solvedChallenge) => solvedChallenge.challengeId === challenge._id
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-3xl font-bold">{challenge?.title}</h1>
          <span>
            {isChallengeSolved ? (
              <span className="flex">
                Solved
                <CheckCircle className="ml-2 font-bold" color="green" />
              </span>
            ) : (
              <span className="flex">
                Unsolved
                <Circle className="ml-2 font-bold" color="green" />
              </span>
            )}
          </span>
        </div>
        <div className="my-2">
          <Badge className="text-sm">{challenge?.difficulty}</Badge>
        </div>
        <div className="my-2">{challenge?.challengeStatement}</div>
        <div className="">
          {challenge?.examples?.map((example, idx) => (
            <div className="" key={example?._id}>
              <p className="font-bold">{`Example ${idx + 1}.`}</p>
              <div className="my-2 border-l-4 p-2">
                <p className="dark:text-gray-400">
                  <span className="font-bold dark:text-white">Input:</span>{" "}
                  {example?.input}
                </p>
                <p className="dark:text-gray-400">
                  <span className="font-bold dark:text-white">Output:</span>{" "}
                  {example?.output}
                </p>
                {example?.explanation && (
                  <p>Explanation: {example?.explanation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <h1 className="my-2 font-bold">
            Boilerplate code ( please use same function name, parameter name can
            be anything)
          </h1>
          <Editor
            className="w-full h-16"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={`function execute(n){ \n \n }
            `}
          />
          <div className="text-center my-2">or</div>
          <Editor
            className="w-full h-16"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={`var execute = function(n){ \n \n }
            `}
          />
        </div>
        <div className="my-4 flex flex-col">
          <p className="font-bold">Constraints</p>

          {challenge?.constraints?.map((constraint, idx) => (
            <div className="" key={constraint}>
              <div className="border-l-4 p-2">
                <p className="dark:text-gray-400">{constraint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionTab;
