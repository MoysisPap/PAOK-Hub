import { useEffect, useState } from 'react';

const SuperLeague = () => {
  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]);
  const [assists, setAssists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/standings?league=197&season=2024', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '21d7dcbc0d55c816620e87a05b6e41a5'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStandings(data.response[0].league.standings[0]);
      } catch (error) {
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };

    const fetchScorers = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/players/topscorers?season=2024&league=197', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '21d7dcbc0d55c816620e87a05b6e41a5'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScorers(data.response.slice(0, 6)); // Display top 6 scorers
      } catch (error) {
        setError('Failed to fetch top scorers');
      } finally {
        setLoading(false);
      }
    };

    const fetchAssists = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/players/topassists?season=2024&league=197', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '21d7dcbc0d55c816620e87a05b6e41a5'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAssists(data.response.slice(0, 6)); // Display top 6 assists
      } catch (error) {
        setError('Failed to fetch top assists');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
    fetchScorers();
    fetchAssists();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Title Inside the Board */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Greek SuperLeague Standings</h1>
      </div>

      {/* Desktop View for Standings */}
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
            {standings.map(team => (
              <tr key={team.team.id}>
                <td className="py-2 px-4 border-b text-center">{team.rank}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <img src={team.team.logo} alt={team.team.name} className="w-8 h-8 mr-2" />
                  {team.team.name}
                </td>
                <td className="py-2 px-4 border-b text-center">{team.points}</td>
                <td className="py-2 px-4 border-b text-center">{team.goalsDiff}</td>
                <td className="py-2 px-4 border-b text-center">{team.all.played}</td>
                <td className="py-2 px-4 border-b text-center">{team.all.win}</td>
                <td className="py-2 px-4 border-b text-center">{team.all.draw}</td>
                <td className="py-2 px-4 border-b text-center">{team.all.lose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View for Standings */}
      <div className="md:hidden">
        {standings.map(team => (
          <div key={team.team.id} className="bg-white border border-gray-200 rounded-lg shadow-md mb-4 p-4">
            <div className="flex items-center mb-4">
              <img src={team.team.logo} alt={team.team.name} className="w-12 h-12 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{team.team.name}</h2>
                <p className="text-gray-600">Rank: {team.rank}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">Points</h3>
                <p className="text-xl text-gray-800">{team.points}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800">Goals Diff</h3>
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

      {/* Titles for Top Scorers and Top Assists */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Top Scorers</h2>
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Top Assists</h2>
        </div>
      </div>

      {/* Top Scorers and Top Assists Sections */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Top Scorers */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {scorers.map(scorer => (
            <div key={scorer.player.id} className="flex items-center border-b pb-4">
              <img src={scorer.player.photo} alt={scorer.player.name} className="w-12 h-12 mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{scorer.player.name}</h3>
                <p className="text-sm text-gray-600">{scorer.statistics[0].team.name}</p>
                <p className="text-sm text-gray-600">{scorer.statistics[0].goals.total} Goals</p>
              </div>
            </div>
          ))}
        </div>

        {/* Top Assists */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-4">
          {assists.map(assist => (
            <div key={assist.player.id} className="flex items-center border-b pb-4">
              <img src={assist.player.photo} alt={assist.player.name} className="w-12 h-12 mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{assist.player.name}</h3>
                <p className="text-sm text-gray-600">{assist.statistics[0].team.name}</p>
                <p className="text-sm text-gray-600">{assist.statistics[0].goals.assists} Assists</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperLeague;
