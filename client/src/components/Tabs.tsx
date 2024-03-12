import CodeReview from "./CodeReview";
import DescriptionTab from "./DescriptionTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function TabsDemo({ challenge, result, isTestcasesTrue }) {
  return (
    <Tabs defaultValue="challenge_description" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="challenge_description">Description</TabsTrigger>
        {/* <TabsTrigger value="solution">Solutions</TabsTrigger> */}
        <TabsTrigger value="code_review">AI Code Review</TabsTrigger>
      </TabsList>
      <TabsContent value="challenge_description">
        <DescriptionTab
          isTestcasesTrue={isTestcasesTrue}
          result={result}
          challenge={challenge}
        />
      </TabsContent>
      {/* <TabsContent value="solution"></TabsContent> */}
      <TabsContent value="code_review">
        <CodeReview isHeader={false} isTitle={false} />
      </TabsContent>
    </Tabs>
  );
}
