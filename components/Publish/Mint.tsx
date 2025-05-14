"use client";
import React, { useState, FormEvent } from "react";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";

interface Props {
  cid: any; // Content Identifier (e.g., IPFS CID)
  assetAddress: string; // Asset address for the marketplace.
}

function Mint({ cid, assetAddress }: Props) {
  const [userAddress, setUserAddress] = useState<string>("");
  const [assetName, setAssetName] = useState<string>("");
  const [metadata, setMetadata] = useState<string>(cid || ""); // Default to `cid` if provided
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Function to validate the user address
  const isValidAddress = (address: string): boolean => {
    // Add your validation logic here (e.g., regex for Diam Wallet address)
    return address.length > 0; // Placeholder validation
  };

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    if (!userAddress || !assetName || !metadata) {
      setResponseMessage("All fields are required.");
      return;
    }

    if (!isValidAddress(userAddress)) {
      setResponseMessage("Invalid user address.");
      return;
    }

    setLoading(true);
    setResponseMessage(""); // Clear previous messages

    try {
// Removed server-side code. Ensure backend logic is implemented in a separate file.

      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress,
          assetName,
          metadata,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`Success: ${data.message}`);
        console.log("XDR:", data.xdr || "No XDR returned");
      } else {
        setResponseMessage(`Error: ${data.error || "Failed to create asset"}`);
      }
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message || "An unexpected error occurred"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Mint Asset</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">User Address</label>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter your Diam Wallet address"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Asset Name</label>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter the asset name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Metadata</label>
          <input
            type="text"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter metadata (e.g., IPFS CID)"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
          disabled={loading}
        >
          {loading ? "Minting Asset..." : "Mint Asset"}
        </button>
      </form>
      {responseMessage && (
        <p className="mt-4 text-sm font-medium">
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default Mint;
