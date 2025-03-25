import fetch from "node-fetch"; // Import fetch for making the request

export const handler = async (event, context) => {
  const url =
    "https://api.football-data.org/v4/competitions/PL/standings?season=2024"; // Your API URL

  const headers = {
    "X-Auth-Token": process.env.VITE_API_KEY, // Get API key from environment variables
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
      body: JSON.stringify({ error: "Failed to fetch standings" }), // Handle errors
    };
  }
};
