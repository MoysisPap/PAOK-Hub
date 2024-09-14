import { useEffect, useState } from 'react';

const SuperLeague = () => {
  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]);
  const [assists, setAssists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Keep error state

  const fetchDataWithCache = async (url, storageKey, setter) => {
    const cachedData = localStorage.getItem(storageKey);
    const cachedTimestamp = localStorage.getItem(`${storageKey}_timestamp`);

    if (
      cachedData &&
      cachedTimestamp &&
      Date.now() - cachedTimestamp < 24 * 60 * 60 * 1000
    ) {
      setter(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      localStorage.setItem(storageKey, JSON.stringify(data.response));
      localStorage.setItem(`${storageKey}_timestamp`, Date.now());
      setter(data.response);
    } catch (error) {
      setError(`Failed to fetch ${storageKey}: ${error.message}`); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataWithCache(
      'https://v3.football.api-sports.io/standings?league=197&season=2024',
      'standings',
      (data) => setStandings(data[0].league.standings[0])
    );
    fetchDataWithCache(
      'https://v3.football.api-sports.io/players/topscorers?season=2024&league=197',
      'scorers',
      (data) => setScorers(data.slice(0, 6))
    );
    fetchDataWithCache(
      'https://v3.football.api-sports.io/players/topassists?season=2024&league=197',
      'assists',
      (data) => setAssists(data.slice(0, 6))
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

      {/* Desktop Standings */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Greek Super League Standings
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
                <td className="py-2 px-4 border-b text-center">{team.rank}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <img
                    src={team.team.logo}
                    alt={`Logo of ${team.team.name}`}
                    className="w-8 h-8 mr-2"
                  />
                  {team.team.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.points}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.goalsDiff}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.all.played}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.all.win}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.all.draw}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {team.all.lose}
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
            className="bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-4"
          >
            <div className="flex items-center mb-4">
              <img
                src={team.team.logo}
                alt={`Logo of ${team.team.name}`}
                className="w-12 h-12 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {team.team.name}
                </h2>
                <p className="text-gray-600">Rank: {team.rank}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">Points</h3>
                <p className="text-xl text-gray-800">{team.points}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">
                  Goals Diff
                </h3>
                <p className="text-xl text-gray-800">{team.goalsDiff}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">Played</h3>
                <p className="text-xl text-gray-800">{team.all.played}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">Wins</h3>
                <p className="text-xl text-gray-800">{team.all.win}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">Draws</h3>
                <p className="text-xl text-gray-800">{team.all.draw}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">Losses</h3>
                <p className="text-xl text-gray-800">{team.all.lose}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop and larger view */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 mb-8 mt-16">
        {/* Top Scorers Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Top Scorers
          </h2>
        </div>

        {/* Top Assists Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Top Assists
          </h2>
        </div>

        {/* Top Scorers Content */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {scorers.map((scorer) => (
            <div
              key={scorer.player.id}
              className="flex items-center border-b pb-4"
            >
              <img
                src={scorer.player.photo}
                alt={`Photo of ${scorer.player.name}`}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {scorer.player.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {scorer.statistics[0].team.name}
                </p>
                <p className="text-sm text-gray-600">
                  {scorer.statistics[0].goals.total} Goals
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Top Assists Content */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {assists.map((assist) => (
            <div
              key={assist.player.id}
              className="flex items-center border-b pb-4"
            >
              <img
                src={assist.player.photo}
                alt={`Photo of ${assist.player.name}`}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {assist.player.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {assist.statistics[0].team.name}
                </p>
                <p className="text-sm text-gray-600">
                  {assist.statistics[0].goals.assists} Assists
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4 mb-8">
        {/* Top Scorers Header */}
        <div className="bg-white border border-gray-200 mt-16 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Top Scorers
          </h2>
        </div>

        {/* Top Scorers Content */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {scorers.map((scorer) => (
            <div
              key={scorer.player.id}
              className="flex items-center border-b pb-4"
            >
              <img
                src={scorer.player.photo}
                alt={`Photo of ${scorer.player.name}`}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {scorer.player.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {scorer.statistics[0].team.name}
                </p>
                <p className="text-sm text-gray-600">
                  {scorer.statistics[0].goals.total} Goals
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Top Assists Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Top Assists
          </h2>
        </div>

        {/* Top Assists Content */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {assists.map((assist) => (
            <div
              key={assist.player.id}
              className="flex items-center border-b pb-4"
            >
              <img
                src={assist.player.photo}
                alt={`Photo of ${assist.player.name}`}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {assist.player.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {assist.statistics[0].team.name}
                </p>
                <p className="text-sm text-gray-600">
                  {assist.statistics[0].goals.assists} Assists
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='py-12'>
        <p className="text-sm text-gray-100 text-center">
          The statistics data is provided by{' '}
          <a
            href="https://www.api-football.com/"
            className="text-sky-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            api-football
          </a>{' '}
          and is updated every 24 hours.
        </p>
      </div>
    </div>
  );
};

export default SuperLeague;
