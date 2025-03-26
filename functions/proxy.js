import fetch from "node-fetch"; // Import node-fetch for API requests

export async function handler() {
  const url =
    "https://api.football-data.org/v4/competitions/PL/standings?season=2024";

  const apiKey = process.env.VITE_API_KEY; // Make sure this is set in Netlify environment variables
  if (!apiKey) {
    console.error("❌ Missing API Key in environment variables");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing API Key" }),
    };
  }

  const headers = {
    "X-Auth-Token": apiKey,
  };

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("❌ Error fetching standings:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch standings" }),
    };
  }
}
