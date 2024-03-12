// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const ProblemRoute = require("./routes/problem");
const SubmissionRoute = require("./routes/submission");
const UsersRoute = require("./routes/user");
const GenerateVoiceRoute = require("./routes/generate_voice_ai");
const { exec } = require("child_process");
const connectToDb = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");
const User = require("./models/User");
const Problem = require("./models/Problem");
const app = express();
const { PORT } = process.env;

// Configure middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api", ProblemRoute);
app.use("/api", GenerateVoiceRoute);
app.use("/api", UsersRoute);
app.use("/api", SubmissionRoute);

// app.use("/api", UsersRoute);

// app.post("/execute", async (req, res) => {
//   const { code, testcases } = req.body;

//   // Execute JavaScript code for each test case
//   const results = testcases.map(({ input, output }) => {
//     try {
//       // Execute user's code with the input
//       const userOutput = String(
//         eval(`${code}\n\nexecute(${JSON.stringify(input)})`)
//       );

//       // Compare the user output with the expected output
//       const passed = userOutput === output;

//       return {
//         input,
//         expected_output: output,
//         user_output: userOutput,
//         passed,
//       };
//     } catch (error) {
//       console.error("Error executing user code:", error);
//       return {
//         input,
//         expected_output: output,
//         user_output: "Error executing code",
//         passed: false,
//       };
//     }
//   });

//   console.log(results, "results");
//   return res.json({ result: results });
// });

app.post("/execute", async (req, res) => {
  const { code, testcases, userId, challengeId } = req.body;

  // Execute JavaScript code for each test case
  const results = testcases.map(({ input, output }) => {
    try {
      // Execute user's code with the input
      const userOutput = String(
        eval(`${code}\n\nexecute(${JSON.stringify(input)})`)
      );

      // Compare the user output with the expected output
      const passed = userOutput === output;

      return {
        input,
        expected_output: output,
        user_output: userOutput,
        passed,
      };
    } catch (error) {
      console.error("Error executing user code:", error);
      return {
        input,
        expected_output: output,
        user_output: "Error executing code",
        passed: false,
      };
    }
  });

  let submissionStatus = "";

  const allPassed = results.every((result) => result.passed === true);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )}-${currentDate.getFullYear()}`;

  // if (allPassed) {
  //   const challenge_difficulty = await Problem.findById(challengeId);
  //   console.log(challenge_difficulty);
  //   submissionStatus = "Accepted";

  //   const challenge = {
  //     challengeId: challengeId,
  //     status: true,
  //     code: code,
  //     solvedDate: formattedDate,
  //     point: calculatePoints(challenge_difficulty.difficulty),
  //   };

  //   const user = await User.findByIdAndUpdate(
  //     userId,
  //     {
  //       $addToSet: { solved_challenges: challenge },
  //     },
  //     { new: true }
  //   );
  // } else {
  //   submissionStatus = "Wrong Answer";
  // }
  if (allPassed) {
    const challenge_difficulty = await Problem.findById(challengeId);
    console.log(challenge_difficulty);
    submissionStatus = "Accepted";

    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        "solved_challenges.challengeId": { $ne: challengeId }, // Check if challengeId doesn't exist in solved_challenges array
      },
      {
        $addToSet: {
          solved_challenges: {
            challengeId: challengeId,
            status: true,
            code: code,
            solvedDate: formattedDate,
            point: calculatePoints(challenge_difficulty.difficulty),
          },
        },
      },
      { new: true }
    );

    if (!user) {
      console.log("User has already solved this challenge.");
      // Handle case where user has already solved this challenge
    }
  } else {
    submissionStatus = "Wrong Answer";
  }

  const submission = {
    challengeId: challengeId,
    code: code,
    status: submissionStatus,
    submittedDate: formattedDate,
  };

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { submissions: submission } },
      { new: true }
    );
    return res.json({ result: results });
  } catch (err) {
    console.error("Error creating submission:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  // // console.log(results, "results");
  // return res.json({ result: results });
});
function calculatePoints(difficulty) {
  switch (difficulty) {
    case "Easy":
      return 5;
    case "Medium":
      return 10;
    case "Hard":
      return 15;
    default:
      return 0; // Default to 0 points if difficulty is not recognized
  }
}
app.listen(PORT, async () => {
  await connectToDb();
  console.log(`Server is running on port ${PORT}`);
});
