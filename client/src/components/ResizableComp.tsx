import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { TabsDemo } from "./Tabs";
import Editor from "@monaco-editor/react";
import { useAppUsers } from "../context/useAppUsers";

export function ResizableComp({
  challenge,
  setCode,
  code,
  result,
  isTestcasesTrue,
  isSubmitted,
}) {
  // const [code, setCode] = useState("");
  // const [result, setResult] = useState("");

  const { user } = useAppUsers();

  // Find the solved challenge with the matching challengeId
  const solvedChallenge = user?.user?.solved_challenges?.find(
    (solvedChallenge) => solvedChallenge.challengeId === challenge?._id
  );

  console.log("solvedChallenge", solvedChallenge);
  console.log("results", result);
  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }
  return (
    <ResizablePanelGroup
      direction="horizontal"
      //   className="w-full rounded-lg border"
      className="w-full rounded-lg min-h-screen border"
    >
      <ResizablePanel className="p-4 w-[100%]" defaultSize={50}>
        <TabsDemo
          isTestcasesTrue={isTestcasesTrue}
          result={result}
          challenge={challenge}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            {/* <Editor
              value={code}
              onChange={(value) => {
                console.log("code monaco editor", value);
                setCode(value);
              }}
              theme="vs-dark"
              defaultLanguage="javascript"
              defaultValue="// Write your logic here..."
              onValidate={handleEditorValidation}
            /> */}
            {solvedChallenge ? (
              <Editor
                value={solvedChallenge?.code}
                onChange={(value) => {
                  console.log("code monaco editor", value);
                  setCode(value);
                }}
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue="// Write your logic here..."
                onValidate={handleEditorValidation}
              />
            ) : (
              <Editor
                value={code}
                onChange={(value) => {
                  console.log("code monaco editor", value);
                  setCode(value);
                }}
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue="// Write your logic here..."
                onValidate={handleEditorValidation}
              />
            )}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} className="p-6 flex flex-col">
            {isSubmitted && (
              <>
                <div>
                  {isTestcasesTrue ? (
                    <h1 className="text-xl text-green-500 font-bold">
                      {"Accepted"}
                    </h1>
                  ) : (
                    <h1 className="font-bold text-red-500 text-xl">
                      Testcases Failed
                    </h1>
                  )}
                </div>
                <div className="flex justify-between flex-wrap">
                  {result &&
                    result?.map((res, idx) => (
                      <div className="my-4" key={idx}>
                        <div>Passed : {res?.passed ? "true" : "false"}</div>

                        <div>Input : {res?.input}</div>
                        <div>Output : {res?.user_output}</div>
                        <div>Expected Output : {res?.expected_output}</div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
