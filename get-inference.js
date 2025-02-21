import express from "express";
import cors from "cors";
import { exec } from "child_process";

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

  exec(`expect get-inference.sh ${topic_id}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    // Extract inference value
    const match = stdout.match(/'inference': '([\d.]+)'/);
    const inference = match ? match[1] : "Not found";

    res.json({ inference });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
