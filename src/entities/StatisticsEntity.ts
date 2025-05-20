export default interface StatisticsData {
  courts: { name: string; count: number; id: string; }[];
  players: { name: string; count: number; id: string; }[];
  totalGames: number;
}
