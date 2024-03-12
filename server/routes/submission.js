// // const axios = require("axios");
// // const express = require("express");
// // const router = express.Router();
// // const Problem = require("../models/Problem");

// // const access_token_problem = process.env.SPHERE_ENGINE_API_TOKEN_PROBLEM;

// // router.post("/execute", async (req, res) => {
// //   try {
// //     const { code } = req.body;

// //     // Prepare submission data
// //     const submissionData = {
// //       source: code,
// //       compilerId: 56,
// //     };

// //     // Submit code to Sphere Engine
// //     const submissionResponse = await axios.post(
// //       `https://dec294b0.compilers.sphere-engine.com/api/v4/submissions?access_token=84c5b68d9589b8dd278516d411dc953b`,
// //       submissionData
// //     );
// //     const submissionId = submissionResponse.data.id;
// //     console.log(submissionId);
// //     await new Promise((resolve) => setTimeout(resolve, 10000));

// //     const statusResponse = await axios.get(
// //       `https://dec294b0.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=84c5b68d9589b8dd278516d411dc953b`
// //     );
// //     const submissionStatus = statusResponse.data;
// //     if (submissionStatus.executing === true) {
// //       await new Promise((resolve) => setTimeout(resolve, 15000));
// //       statusResponse = await axios.get(
// //         `https://dec294b0.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=84c5b68d9589b8dd278516d411dc953b`
// //       );
// //       submissionStatus = statusResponse.data;
// //     }
// //     //Checking the status of the submission, It give different result -> Wrong answer , Accepted , Time Limet Executed, Compilation Error.
// //     console.log(submissionStatus);
// //     // res.status(200).json(submissionStatus.result.status.name);
// //     return res.status(200).json({result : submissionStatus});

// //   } catch (err) {
// //     // Check if the error response contains a response from Sphere Engine
// //     if (err.response && err.response.data) {
// //       // Return the error message from Sphere Engine
// //       return res.status(400).json({ error: err.response.data });
// //     } else {
// //       // Otherwise, return a generic error message
// //       return res.status(500).json({ error: err });
// //     }
// //   }
// // });

// // module.exports = router;

// // ----------------------- For Java ------------------------------------
// // const axios = require("axios");
// // const express = require("express");
// // const router = express.Router();

// // // Endpoint to execute Java code
// // router.post("/execute", async (req, res) => {
// //   try {
// //     const { code } = req.body;

// //     // Prepare submission data
// //     const submissionData = {
// //       source: code,
// //       compilerId: 10, // Compiler ID for Java
// //     };

// //     // Submit code to Sphere Engine
// //     const submissionResponse = await axios.post(
// //       "https://dec294b0.compilers.sphere-engine.com/api/v4/submissions?access_token=84c5b68d9589b8dd278516d411dc953b",
// //       submissionData
// //     );

// //     const submissionId = submissionResponse.data.id;
// //     console.log("Submission ID:", submissionId);

// //     // Wait for some time before checking submission status
// //     await new Promise((resolve) => setTimeout(resolve, 5000));

// //     // Get submission status
// //     let submissionStatus = {};
// //     do {
// //       const statusResponse = await axios.get(
// //         `https://dec294b0.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=84c5b68d9589b8dd278516d411dc953b`
// //       );
// //       submissionStatus = statusResponse.data;
// //       await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
// //     } while (submissionStatus.executing === true);

// //     // Return the result to the client
// //     console.log(submissionStatus);
// //     return res.status(200).json({ result: submissionStatus });
// //   } catch (err) {
// //     console.error("Error executing code:", err);
// //     res.status(500).json({ error: "Error executing code" });
// //   }
// // });

// // module.exports = router;

// // ---------------------- For c++ -------------------------------
// // const axios = require("axios");
// // const express = require("express");
// // const router = express.Router();

// // // Endpoint to execute C++ code
// // router.post("/execute", async (req, res) => {
// //   try {
// //     const { code } = req.body;

// //     // Prepare submission data
// //     const submissionData = {
// //       source: code,
// //       compilerId: 41, // Compiler ID for C++
// //     };

// //     // Submit code to Sphere Engine
// //     const submissionResponse = await axios.post(
// //       "https://dec294b0.compilers.sphere-engine.com/api/v4/submissions?access_token=84c5b68d9589b8dd278516d411dc953b",
// //       submissionData
// //     );

// //     const submissionId = submissionResponse.data.id;
// //     console.log("Submission ID:", submissionId);

// //     // Wait for some time before checking submission status
// //     await new Promise((resolve) => setTimeout(resolve, 5000));

// //     // Get submission status
// //     let submissionStatus = {};
// //     do {
// //       const statusResponse = await axios.get(
// //         `https://dec294b0.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=84c5b68d9589b8dd278516d411dc953b`
// //       );
// //       submissionStatus = statusResponse.data;
// //       await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
// //     } while (submissionStatus.executing === true);

// //     // Return the result to the client
// //     console.log(submissionStatus);
// //     return res.status(200).json({ result: submissionStatus });
// //   } catch (err) {
// //     console.error("Error executing code:", err);
// //     res.status(500).json({ error: "Error executing code" });
// //   }
// // });

// // module.exports = router;

// // ----------------------- Python ------------------------------------
// // const axios = require("axios");
// // const express = require("express");
// // const router = express.Router();

// // // Endpoint to execute Python code
// // router.post("/execute", async (req, res) => {
// //   try {
// //     const { code } = req.body;

// //     // Prepare submission data
// //     const submissionData = {
// //       source: code,
// //       compilerId: 116, // Compiler ID for Python
// //     };

// //     // Submit code to Sphere Engine
// //     const submissionResponse = await axios.post(
// //       "https://dec294b0.compilers.sphere-engine.com/api/v4/submissions?access_token=84c5b68d9589b8dd278516d411dc953b",
// //       submissionData
// //     );

// //     const submissionId = submissionResponse.data.id;
// //     console.log("Submission ID:", submissionId);

// //     // Wait for some time before checking submission status
// //     await new Promise((resolve) => setTimeout(resolve, 5000));

// //     // Get submission status
// //     let submissionStatus = {};
// //     do {
// //       const statusResponse = await axios.get(
// //         `https://dec294b0.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=84c5b68d9589b8dd278516d411dc953b`
// //       );
// //       submissionStatus = statusResponse.data;
// //       await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
// //     } while (submissionStatus.executing === true);

// //     // Return the result to the client
// //     return res.status(200).json({ result: submissionStatus });
// //   } catch (err) {
// //     console.error("Error executing code:", err);
// //     res.status(500).json({ error: "Error executing code" });
// //   }
// // });

// // module.exports = router;

// // with testcases passing
// const axios = require("axios");
// const express = require("express");
// const router = express.Router();

// // Endpoint to execute Python code with test cases
// router.post("/execute", async (req, res) => {
//   try {
//     const { code, testcases } = req.body;

//     // Array to store results of each test case
//     const results = [];

//     // Loop through each test case
//     for (const testcase of testcases) {
//       const { input, output } = testcase;

//       // Prepare submission data for current test case
//       const submissionData = {
//         source: code,
//         compilerId: 116, // Compiler ID for Python
//         input: input, // Pass input to the code
//       };

//       // Submit code to Sphere Engine
//       const submissionResponse = await axios.post(
//         "https://dec294b0.compilers.sphere-engine.com/api/v4/submissions?access_token=84c5b68d9589b8dd278516d411dc953b",
//         submissionData
//       );

//       const submissionId = submissionResponse.data.id;
//       console.log("Submission ID:", submissionId);

//       // Wait for the submission to finish executing
//       await new Promise((resolve) => setTimeout(resolve, 5000));

//       // Get submission details including output
//       const statusResponse = await axios.get(
//         `https://dec294b0.compilers.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=84c5b68d9589b8dd278516d411dc953b`
//       );

//       // Check if submissionStatus.output is defined
//       const submissionStatus = statusResponse.data;
//       const userOutput = submissionStatus?.streams?.output
//         ? submissionStatus.streams.output.trim()
//         : null;

//       // Compare output with expected output
//       const passed = userOutput === output;

//       // Push result to results array
//       results.push({
//         input: input,
//         expected_output: output,
//         user_output: userOutput,
//         passed: passed,
//       });
//     }

//     // Return the results to the client
//     return res.status(200).json({ results });
//   } catch (err) {
//     console.error("Error executing code:", err);
//     res.status(500).json({ error: "Error executing code" });
//   }
// });

// module.exports = router;

const express = require("express");
const Submission = require("../models/Submissions");
const User = require("../models/User");
const Problem = require("../models/Problem");
const router = express.Router();

router.post("/submission", async (req, res) => {
  const { userId, challengeId, code, submission_status } = req.body;

  const submission = await Submission.create({
    code,
    userId,
    challengeId,
    submission_status,
  });

  await User.findByIdAndUpdate(userId, {
    $push: {
      challenges_solved: {
        challengeId,
        code,
        submission_status,
      },
    },
  });
  const user = await User.findById(userId);
  const challenge = await Problem.findById(challengeId);

  // return res.status(200).json({ submission: submission });
  return res.status(200).json({
    submission: {
      ...submission.toObject(), // Convert Mongoose document to plain JavaScript object
      user: user,
      challenge: challenge,
    },
  });
});

router.get("/allsubmissions", async (req, res) => {
  const { userId } = req.body;

  const submissions = await Submission.find({});

  return res.status(200).json({ submissions });
});

router.get('/allsubmissionslength', async (req, res) => {
  try {
      const users = await User.find({}); // Retrieve all users

      let totalSubmissions = 0; // Initialize total submissions count
      const usersWithSubmissionsCount = users.map(user => {
          const submissionsCount = user.submissions.length; // Get submissions array length for current user
          totalSubmissions += submissionsCount; // Add current user's submissions count to total
          return totalSubmissions; // Return total submissions count up to current user
      });

      // Return the result
      res.status(200).json({ totalSubmissions: totalSubmissions });
  } catch (error) {
      // Handle errors
      console.error("Error getting submissions count:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
