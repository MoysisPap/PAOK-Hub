// mockData.js

export const mockLeagueData = {
  league: {
    id: 197,
    name: "Super League 1",
    logo: "https://media.api-sports.io/football/leagues/197.png",
  },
  country: {
    name: "Greece",
    code: "GR",
    flag: "https://media.api-sports.io/flags/gr.svg",
  },
  seasons: [
    {
      year: 2024,
      start: "2024-08-17",
      end: "2025-03-09",
    },
  ],
};

export const mockStandings = [
  {
    position: 1,
    team: { id: 1, name: "Team A" },
    played: 10,
    won: 8,
    draw: 1,
    lost: 1,
    points: 25,
  },
  // ... more teams
];

export const mockTopScorers = [
  { player: { id: 1, name: "Player 1" }, goals: 12 },
  { player: { id: 2, name: "Player 2" }, goals: 10 },
  // ... more scorers
];

export const mockFixtures = [
  { id: 1, homeTeam: "Team A", score: "2-1", awayTeam: "Team B" },
  { id: 2, homeTeam: "Team C", score: "0-0", awayTeam: "Team D" },
  // ... more fixtures
];

export const mockTeams = [
  { id: 1, name: "Team A", city: "City A" },
  { id: 2, name: "Team B", city: "City B" },
  // ... more teams
];
