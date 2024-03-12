import { ResizableComp } from "../components/ResizableComp";
import {
  ArrowBigLeft,
  MoveLeft,
  MoveRight,
  RotateCcw,
  UploadCloud,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useChallenge } from "../context/useChallenges";
import axios from "axios";

import { useEffect, useState } from "react";
import { toast } from "../components/ui/use-toast";

const Challenge = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isTestcasesTrue, setIsTestcasestrue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id } = useParams();
  const navigateTo = useNavigate();
  const { challenges } = useChallenge();

  const currentIndex = challenges.findIndex(
    (challenge) => challenge._id === id
  );

  console.log("currentIndex", currentIndex);
  const totalChallenges = challenges.length;
  console.log("challenges length", totalChallenges);

  const goToNextChallenge = () => {
    const nextIndex = (currentIndex + 1) % totalChallenges;
    console.log("next index", nextIndex);
    const nextId = challenges[nextIndex]._id;
    navigateTo(`/challenges/${nextId}`);
  };

  const goToPreviousChallenge = () => {
    const prevIndex = (currentIndex - 1 + totalChallenges) % totalChallenges;
    console.log("prev index", prevIndex);

    const prevId = challenges[prevIndex]._id;
    navigateTo(`/challenges/${prevId}`);
  };
  console.log("challenge-id", id);

  const challenge = challenges?.find((challenge) => challenge?._id === id);
  // console.log(challenge);

  const handleSubmit = async () => {
    if (!code)
      return toast({
        variant: "destructive",
        title: "Write the code before submission",
      });
    try {
      const response = await axios.post("http://localhost:5000/execute", {
        code: code,
        testcases: challenge?.testcases,
        userId: localStorage.getItem("userId"),
        challengeId: id,
      });
      console.log(response.data.result);
      setResult(response.data.result);

      const testcasesPassed = response.data.result
        ? response.data.result
            .map((obj) => obj.passed)
            .every((passed) => passed === true)
        : false;

      console.log("testcasesPassed", testcasesPassed);

      // const res = await axios.post("http://localhost:5000/api/submission", {
      //   userId: localStorage.getItem("userId"),
      //   challengeId: challenge?._id,
      //   code: code,
      //   submission_status: testcasesPassed,
      // });
      // console.log("submission result", res.data);
      // console.log("result", response.data.result);
      setIsTestcasestrue(testcasesPassed);
      setIsSubmitted((prev) => !prev);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl (or Command on Mac) + S is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        // Prevent the default action (saving the page)
        event.preventDefault();
        // Optionally, you can show a message or perform some other action
        console.log("Ctrl+S is disabled on this page");
      }
    };
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex flex-col">
      {/* <Header /> */}

      {/* Challenge move back and forth*/}
      <div className="p-4 w-full flex items-center justify-between">
        <Link to={"/challenges"}>
          <Button variant={"outline"}>
            <ArrowBigLeft /> View Challenges
          </Button>
        </Link>
        <div className="">
          <Button
            onClick={goToPreviousChallenge}
            variant={"outline"}
            className="mx-2"
          >
            <MoveLeft />
          </Button>
          <Button onClick={goToNextChallenge} variant={"outline"} className="">
            <MoveRight />
          </Button>
        </div>
        <div className="">
          <Button onClick={handleSubmit}>
            <UploadCloud /> <span className="ml-1">Submit</span>
          </Button>
        </div>
        <div className="">
          <Button
            variant={"outline"}
            onClick={() => {
              setCode("");
              setResult("");
              setIsTestcasestrue(false);
            }}
          >
            <RotateCcw /> <span className="ml-1">Reset</span>
          </Button>
        </div>
      </div>
      <div className="p-2 w-full">
        <ResizableComp
          setCode={setCode}
          code={code}
          result={result}
          challenge={challenge}
          isTestcasesTrue={isTestcasesTrue}
          isSubmitted={isSubmitted}
        />
      </div>
    </div>
  );
};

export default Challenge;
