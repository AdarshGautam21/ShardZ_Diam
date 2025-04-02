import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" })); // Replace with your frontend URL

// POST endpoint for Minting
app.post("/Publish/Mint", async (req, res) => {
  const { userAddress, assetName, metadata } = req.body;

  // Validate request body
  if (!userAddress || !assetName || !metadata) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Simulate asset creation logic
    const xdr = "Simulated XDR String"; // Replace with actual XDR logic

    // Respond with success
    res.status(200).json({ message: "Asset created successfully", xdr });
  } catch (error) {
    console.error("Error during asset creation:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create asset" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});