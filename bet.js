const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

// Middleware for parsing JSON body
app.use(cors());
app.use(express.json());

app.post("/run-script", (req, res) => {
  const { topic_id } = req.body;

  if (!topic_id) {
    return res.status(400).json({ error: "Missing topic_id" });
  }

  let scriptCommand;

  if (Array.isArray(topic_id) && topic_id.length === 3) {
    // Call multi-topic inference script
    scriptCommand = `expect bet.sh ${topic_id.join(" ")}`;
  } else if (typeof topic_id === "number") {
    // Call single-topic inference script
    scriptCommand = `expect get-inference.sh ${topic_id}`;
  } else {
    return res.status(400).json({ error: "Invalid topic_id format" });
  }

  exec(scriptCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    // Extract inference values
    const matches = stdout.match(/Result: {(.*?)}/g);
    const inferences = matches
      ? matches.map((match) => match.replace("Result: ", "").trim())
      : [];

    res.json({ inference: inferences });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
