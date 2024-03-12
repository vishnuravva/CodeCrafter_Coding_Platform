import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { ArrowBigLeft, ChevronLeftCircle, Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import AdmNav from "../../components/admin/AdmNav";
import { useToast } from "../../components/ui/use-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Link } from "react-router-dom";

const AdmAddChallenges = () => {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [challengeStatement, setChallengeStatement] = useState("");

  const [starterCode, setStarterCode] = useState("");
  const [constraint, setConstraint] = useState("");
  const [constraints, setConstraints] = useState([]);
  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");
  const [exampleExplanation, setExampleExplanation] = useState("");
  const [examples, setExamples] = useState([]);
  const [difficulty, setDifficulty] = useState();

  const [testcases, setTestcases] = useState([]);
  const [testcaseInput, setTestcaseInput] = useState<string | []>("");
  const [testcaseOutput, setTestcaseOutput] = useState<string | []>("");
  const [testcaseTarget, setTestcaseTarget] = useState<string | []>("");
  const [testcaseAnswer, setTestcaseAnswer] = useState<string | []>("");

  const handleAddConstraint = () => {
    if (constraint.trim() !== "") {
      setConstraints([...constraints, constraint]);
      setConstraint("");
    }
  };

  const handleRemoveConstraint = (index) => {
    const updatedConstraints = constraints.filter((_, i) => i !== index);
    setConstraints(updatedConstraints);
  };
  const handleDifficultyChange = (value) => {
    console.log(value);
    setDifficulty(value);
  };

  const handleAddExample = () => {
    if (exampleInput.trim() !== "" && exampleOutput.trim() !== "") {
      setExamples([
        ...examples,
        {
          input: exampleInput,
          output: exampleOutput,
          explanation: exampleExplanation,
        },
      ]);
      setExampleInput("");
      setExampleOutput("");
      setExampleExplanation("");
    }
  };
  const handleDeleteExample = (index) => {
    setExamples(examples.filter((_, idx) => idx !== index));
  };

  const handleDeleteTestcase = (index) => {
    setTestcases(testcases.filter((_, idx) => idx !== index));
  };

  const handleClearFields = () => {
    setExamples([]);
    setConstraints([]);
    setTestcases([]);
  };
  const handleAddTestcase = () => {
    if (testcaseInput.trim() !== "" && testcaseOutput.trim() !== "") {
      setTestcases([
        ...testcases,
        {
          input: testcaseInput,
          output: testcaseOutput,
          target: testcaseTarget,
          answer: testcaseAnswer,
        },
      ]);
      setTestcaseInput("");
      setTestcaseOutput("");
      setTestcaseTarget("");
      setTestcaseAnswer("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !difficulty || !constraints || !examples || !testcases) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "All fields are necessary",
      });
    }
    console.log("problem adding");
    const addProblem = axios.post("http://localhost:5000/api/addproblems", {
      title: title,
      difficulty: difficulty,
      constraints: constraints,
      examples: examples,
      challengeStatement: challengeStatement,
      testcases: testcases,
    });
    console.log("problem added");
    toast({
      description: "Challenge Added Successfully",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <AdmNav />

      <div className="max-w-[85%] my-4">
        <Link to={"/admin/challenges"}>
          <Button variant={"outline"}>
            <ArrowBigLeft /> View Challenges
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Add Challenges</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 m-4">
          <div>
            <div className="my-4">
              <Label className="my-2">Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter challenge title"
              />
            </div>
            <div>
              <Label className="my-2">Difficulty</Label>
              <Select onValueChange={handleDifficultyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Add Constraints */}
            <div className="my-4">
              <Label className="my-2">Constraints</Label>
              <Input
                type="text"
                value={constraint}
                onChange={(e) => setConstraint(e.target.value)}
                placeholder="Add a constraint"
              />
              <Button className="my-4" onClick={handleAddConstraint}>
                <Plus />
              </Button>
            </div>
            {constraints.length > 0 && (
              <div className="border flex flex-col gap-4 p-2 rounded-lg bg-zinc-100 dark:bg-gray-900">
                {constraints.map((c, index) => (
                  <div
                    className="flex justify-between items-center border p-2 rounded-lg"
                    key={index}
                  >
                    {c}
                    <Button
                      className="ml-4"
                      onClick={() => handleRemoveConstraint(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {/* Add Examples */}
            <div className="my-4">
              <label className="my-2">Examples</label>
              <div>
                <Input
                  className="my-2"
                  type="text"
                  value={exampleInput}
                  onChange={(e) => setExampleInput(e.target.value)}
                  placeholder="Input"
                />
                <Input
                  className="my-2"
                  type="text"
                  value={exampleOutput}
                  onChange={(e) => setExampleOutput(e.target.value)}
                  placeholder="Output"
                />
                <Input
                  className="my-2"
                  type="text"
                  value={exampleExplanation}
                  onChange={(e) => setExampleExplanation(e.target.value)}
                  placeholder="Explanation"
                />
                <Button className="my-2" onClick={handleAddExample}>
                  <Plus />
                </Button>
              </div>
              {examples.length > 0 && (
                <div className="my-4 border p-2 bg-zinc-100 dark:bg-gray-900 rounded-lg">
                  {examples.map((example, index) => (
                    <div
                      key={index}
                      className="flex my-2 md:flex-row flex-col justify-between items-center border p-2 rounded-lg"
                    >
                      <div>
                        <p>Input: {example.input}</p>
                        <p>Output: {example.output}</p>
                        <p>Explanation: {example.explanation}</p>
                      </div>

                      <Button onClick={() => handleDeleteExample(index)}>
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="">
            <div className="my-4">
              <label className="my-2">Testcases</label>
              <div>
                <Input
                  className="my-2"
                  type="text"
                  value={testcaseInput}
                  onChange={(e) => setTestcaseInput(e.target.value)}
                  placeholder="Input"
                />
                <Input
                  className="my-2"
                  type="text"
                  value={testcaseOutput}
                  onChange={(e) => setTestcaseOutput(e.target.value)}
                  placeholder="Output"
                />
                <Input
                  className="my-2"
                  type="text"
                  value={testcaseTarget}
                  onChange={(e) => setTestcaseTarget(e.target.value)}
                  placeholder="Targets (if any)"
                />
                <Input
                  className="my-2"
                  type="text"
                  value={testcaseAnswer}
                  onChange={(e) => setTestcaseAnswer(e.target.value)}
                  placeholder="for eg: true"
                />
                <Button className="my-2" onClick={handleAddTestcase}>
                  <Plus />
                </Button>
              </div>
              {testcases.length > 0 && (
                <div className="my-4 border p-2 bg-zinc-100 dark:bg-gray-900 rounded-lg">
                  {testcases.map((testcase, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border p-2 my-2 rounded-lg"
                    >
                      <div>
                        <p>Input: {testcase.input}</p>
                        <p>Output: {testcase.output}</p>
                        <p>Target: {testcase.target}</p>
                      </div>

                      <Button onClick={() => handleDeleteTestcase(index)}>
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="my-4">
              <Label className="my-2">Challenge Statement</Label>
              <Textarea
                value={challengeStatement}
                onChange={(e) => setChallengeStatement(e.target.value)}
                cols={75}
                rows={5}
                placeholder="Enter problem statement"
              />
            </div>
          </div>
          <div className="flex">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button className="ml-4" onClick={handleClearFields}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmAddChallenges;
