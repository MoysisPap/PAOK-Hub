// netlify/functions/proxy.js

import fetch from "node-fetch"; // Import fetch to make requests

export const handler = async (event, context) => {
  const url =
    "https://api.football-data.org/v4/competitions/PL/standings?season=2024"; // API URL

  const headers = {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY, // Use environment variable for API key
  };

  try {
    // Make the request to the external API
    const response = await fetch(url, { headers });
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data), // Send the API response back to the frontend
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch standings" }), // Handle errors
    };
  }
};
