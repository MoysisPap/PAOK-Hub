import React, { useState, useEffect } from 'react';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch("https://v3.football.api-sports.io/standings?league=197&season=2024", {
          method: 'GET',
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "21d7dcbc0d55c816620e87a05b6e41a5" // Your API key
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStandings(data.response[0].league.standings[0]); // Adjust based on data structure
      } catch (error) {
        setError('Failed to fetch standings');
        console.error('Error fetching standings:', error);
      }
    };

    fetchStandings();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      {error && <div className="text-red-500">{error}</div>}
      <h1 className="text-2xl font-bold mb-4">Greek SuperLeague Standings</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Team</th>
            <th className="py-2 px-4 border-b">Points</th>
            <th className="py-2 px-4 border-b">Goals Difference</th>
            <th className="py-2 px-4 border-b">Played</th>
            <th className="py-2 px-4 border-b">Won</th>
            <th className="py-2 px-4 border-b">Draw</th>
            <th className="py-2 px-4 border-b">Lost</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team.id}>
              <td className="py-2 px-4 border-b">{team.rank}</td>
              <td className="py-2 px-4 border-b flex items-center">
                <img src={team.team.logo} alt={team.team.name} className="w-8 h-8 mr-2" />
                {team.team.name}
              </td>
              <td className="py-2 px-4 border-b">{team.points}</td>
              <td className="py-2 px-4 border-b">{team.goalsDiff}</td>
              <td className="py-2 px-4 border-b">{team.all.played}</td>
              <td className="py-2 px-4 border-b">{team.all.win}</td>
              <td className="py-2 px-4 border-b">{team.all.draw}</td>
              <td className="py-2 px-4 border-b">{team.all.lose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
