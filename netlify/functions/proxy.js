// netlify/functions/proxy.js

const fetch = require("node-fetch"); // Importing fetch to make requests

exports.handler = async (event, context) => {
  const url =
    "https://api.football-data.org/v4/competitions/PL/standings?season=2024"; // API URL

  const headers = {
    "X-Auth-Token": "YOUR_API_KEY", // Replace this with your actual API key
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data), // Send the API response back to the frontend
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch standings" }),
    };
  }
};
