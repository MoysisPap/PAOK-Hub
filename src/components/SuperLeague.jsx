import React, { useEffect, useState } from "react";

const SuperLeague = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Premier League standings for 2024 season
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(
          "/football-api/v4/competitions/PL/standings?season=2024", // Using the proxy path
          {
            method: "GET", // No need for headers with API key; Vite proxy handles it
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch standings");
        }
        const data = await response.json();
        setStandings(data.standings[0].table); // Extract standings data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <p>Loading standings...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-rubik text-center text-neutral-100 mb-16">
        PAOK Hub Statistics
      </h1>

      {/* Desktop Standings */}
      <div className="bg-white border border-gray-200 rounded-lg mx-4 md:mx-auto shadow-md mb-4 flex justify-center items-center">
        <img
          src="https://crests.football-data.org/PL.png"
          alt="Premier League Logo"
          className="w-32 h-32"
        />
      </div>

      <div className="hidden md:block bg-white border border-gray-200 rounded-lg shadow-md overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Team</th>
              <th className="py-2 px-4 border-b">Played</th>
              <th className="py-2 px-4 border-b">Won</th>
              <th className="py-2 px-4 border-b">Drawn</th>
              <th className="py-2 px-4 border-b">Lost</th>
              <th className="py-2 px-4 border-b">Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.team.id}>
                <td className="py-2 px-4 border-b text-center">
                  {team.position}
                </td>
                <td className="py-2 px-4 border-b flex items-center">
                  <img
                    src={team.team.crest} // Corrected to use the crest field
                    alt={`Logo of ${team.team.name}`}
                    className="w-8 h-8 mr-2"
                  />
                  {team.team.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.playedGames}
                </td>
                <td className="py-2 px-4 border-b text-center">{team.won}</td>
                <td className="py-2 px-4 border-b text-center">{team.draw}</td>
                <td className="py-2 px-4 border-b text-center">{team.lost}</td>
                <td className="py-2 px-4 border-b font-black text-center">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Standings */}
      <div className="md:hidden">
        {standings.map((team) => (
          <div
            key={team.team.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md mx-4 mb-4 p-4"
          >
            <div className="flex items-center mb-4">
              <img
                src={team.team.crest} // Corrected to use the crest field
                alt={`Logo of ${team.team.name}`}
                className="w-12 h-12 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {team.team.name}
                </h2>
                <p className="text-gray-600">Rank: {team.position}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-800">Points</h3>
                <p className=" text-gray-800 font-black">{team.points}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-800">
                  Goals Diff
                </h3>
                <p className=" text-gray-800">{team.goalDifference}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-800">Played</h3>
                <p className=" text-gray-800">{team.playedGames}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-800">Wins</h3>
                <p className=" text-gray-800">{team.won}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-800">Draws</h3>
                <p className=" text-gray-800">{team.draw}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-800">Losses</h3>
                <p className=" text-gray-800">{team.lost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperLeague;
