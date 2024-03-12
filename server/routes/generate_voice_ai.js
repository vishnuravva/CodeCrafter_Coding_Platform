// const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();

const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN;
router.post("/generate", async (req, res) => {
  try {
    // Parse the JSON payload from the request body
    const { modelUrl, input } = req.body;

    // Check if the 'modelUrl' and 'input' fields are provided in the request body
    if (!modelUrl || !input) {
      return res.status(400).json({
        error: "Missing 'modelUrl' or 'input' field in the request body",
      });
    }

    // Check if the 'HUGGING_FACE_TOKEN' environment variable is set
    if (HUGGING_FACE_TOKEN) {
      return res
        .status(500)
        .json({ error: "Missing 'HUGGING_FACE_TOKEN' environment variable" });
    }

    // Make a POST request to the specified 'modelUrl' using Hugging Face token for authorization
    const response = await fetch(modelUrl, {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_TOKEN}`, // Use the correct token
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: input }),
    });

    // Get the generated audio data as an ArrayBuffer
    const audioData = await response.arrayBuffer();

    // Check if the HTTP response is not successful
    if (!response.ok) {
      return res.status(response.status).json({ error: "Request failed" });
    }

    // Send the generated audio data as a response
    res.set("Content-Type", "audio/mpeg"); // Adjust the content type based on the actual audio format
    res.send(audioData);
  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
