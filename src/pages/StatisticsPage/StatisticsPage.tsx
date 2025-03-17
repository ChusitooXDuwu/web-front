import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import style from "./StatisticsPage.module.scss";
import { FormattedMessage } from "react-intl";
import { ReactComponent as StatisticsIcon } from "../../icons/statistics.svg";

interface StatisticsData {
  courts: { name: string; count: number }[];
  players: { name: string; count: number }[];
  totalGames: number;
}

const mockData: StatisticsData = {
  totalGames: 123,
  courts: [
    { name: "Cancha A", count: 45 },
    { name: "Cancha B", count: 30 },
  ],
  players: [
    { name: "Juan Pérez", count: 50 },
    { name: "María López", count: 40 },
  ],
};
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORS_PLAYER = ["#8e44ad", "#9b59b6", "#c0392b", "#e74c3c"];

const StatisticsPage: React.FC = () => {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/statistics.json?key=YOUR_MOCKAROO_KEY")
      .then((response) => {
        setStats(response.data); // Ajusta según el formato de tu API
      })
      .catch(() => {
        setStats(mockData); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p><FormattedMessage id="profile.statistics.loading"/>...</p>;
 

  return (
    <div className={style.statisticsContainer}>
      <h2 className={style.title}>
        <StatisticsIcon className={style.image} style={{ fill: "#E99E14" }} fill={"#E99E14"}/>
        <FormattedMessage id="profile.statistics"/>
        </h2>
      <div className={style.section}>
        <h3 className={style.subtitle}><FormattedMessage id="profile.statistics.total"/>: {stats?.totalGames ?? "Cargando..."}</h3>
      </div>

      <div className={style.chartsContainer}>
        <div className={style.chartBox}>
          <h3 className={style.chartTitle}><FormattedMessage id="profile.statistics.court"/></h3>
          <PieChart width={300} height={300}>
            <Pie
              data={stats?.courts || []}
              dataKey="count"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {stats?.courts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className={style.chartBox}>
          <h3 className={style.chartTitle}><FormattedMessage id="profile.statistics.player"/></h3>
          <PieChart width={300} height={300}>
            <Pie
              data={stats?.players || []}
              dataKey="count"
              nameKey="name"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {stats?.players.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_PLAYER[index % COLORS_PLAYER.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};


export default StatisticsPage;