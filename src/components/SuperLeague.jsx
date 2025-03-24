import { useEffect, useState } from "react";

const SuperLeague = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataWithCache = async (url, storageKey, setter) => {
    const cachedData = localStorage.getItem(storageKey);
    const cachedTimestamp = localStorage.getItem(`${storageKey}_timestamp`);

    if (
      cachedData &&
      cachedTimestamp &&
      Date.now() - cachedTimestamp < 24 * 60 * 60 * 1000
    ) {
      // Use cached data if it exists and is less than 24 hours old
      setter(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": "7083bcc646ee421da3b53a90c205b78d", // Directly added API key
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Log the data to check structure (only for debugging)
      console.log(data);

      // Assuming data.standings[0].table is the correct path
      localStorage.setItem(storageKey, JSON.stringify(data.standings[0].table));
      localStorage.setItem(`${storageKey}_timestamp`, Date.now());

      // Update the standings state with the fetched data
      setter(data.standings[0].table);
    } catch (error) {
      setError(`Failed to fetch standings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the standings on component mount
    fetchDataWithCache(
      "https://api.football-data.org/v4/competitions/PL/standings?season=2024", // Update endpoint if necessary
      "standings",
      (data) => setStandings(data)
    );
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-rubik text-center text-neutral-100 mb-16">
        PAOK Hub Statistics
      </h1>

      {/* Standings Table for Desktop */}
      <div className="bg-white border border-gray-200 rounded-lg mx-4 md:mx-auto shadow-md mb-4 p-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Premier League Standings
        </h2>
      </div>
      <div className="hidden md:block bg-white border border-gray-200 rounded-lg shadow-md overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-2 px-4 border-b">Rank</th>
              <th className="py-2 px-4 border-b">Team</th>
              <th className="py-2 px-4 border-b">Points</th>
              <th className="py-2 px-4 border-b">Goals Diff</th>
              <th className="py-2 px-4 border-b">Played</th>
              <th className="py-2 px-4 border-b">Wins</th>
              <th className="py-2 px-4 border-b">Draws</th>
              <th className="py-2 px-4 border-b">Losses</th>
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
                    src={team.team.crest}
                    alt={`Logo of ${team.team.name}`}
                    className="w-8 h-8 mr-2"
                  />
                  {team.team.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.points}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.goalDifference}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.playedGames}
                </td>
                <td className="py-2 px-4 border-b text-center">{team.won}</td>
                <td className="py-2 px-4 border-b text-center">{team.draw}</td>
                <td className="py-2 px-4 border-b text-center">{team.lost}</td>
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
                src={team.team.crest}
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
                <p className=" text-gray-800">{team.points}</p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperLeague;
