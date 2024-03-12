import React, { useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Button } from "./ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Skeleton } from "./ui/skeleton";
import Header from "./Header";

const CodeReview = ({ isTitle, isHeader }) => {
  const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewCode, setReviewCode] = useState();
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Please analyze the time complexity, review the memory usage, Evaluate the readability. Also provide suggestions for alignment with best practices for the code point-wise in 10-15 lines ${reviewCode}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setApiData(text);
    setLoading(false);
  };
  const handleAI = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };
  console.log("apiData", apiData);
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {isHeader ? <Header /> : ""}
      <div className="w-2/3">
        {isTitle ? (
          <div className="p-4">
            <h1 className="text-4xl text-center mb-8 font-bold dark:text-gray-500">
              AI Code Review
            </h1>
          </div>
        ) : (
          ""
        )}

        <div className="p-2 flex flex-col">
          <Textarea
            cols={100}
            rows={20}
            onChange={(e) => {
              setReviewCode(e.target.value);
            }}
            value={reviewCode}
            placeholder="Paste your code here for review"
          />
          <Button
            disabled={!reviewCode?.trim()}
            className="my-4"
            onClick={handleAI}
          >
            Review
          </Button>
        </div>
        <div className="min-h-52">
          {loading ? (
            <div className="w-full flex flex-col items-center">
              {Array.from({ length: 5 }, (_, idx) => (
                <Skeleton key={idx} className="my-4 w-5/12 h-2 bg-slate-700" />
              ))}
            </div>
          ) : (
            <div
              className="font-bold text-green-500 p-2 min-h-52"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {apiData}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeReview;
