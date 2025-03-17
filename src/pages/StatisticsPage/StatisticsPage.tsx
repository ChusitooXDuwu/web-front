import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import style from "./StatisticsPage.module.scss";
import { FormattedMessage } from "react-intl";
import { ReactComponent as StatisticsIcon } from "../../icons/statistics.svg";
import Spinner from 'react-bootstrap/Spinner';
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
      .get("https://my.api.mockaroo.com/conteos_sport_hub_stats.json?key=d49a1240")
      .then((response) => {
        const rawData = response.data; // Datos en el formato [{name: "...", count: ...}, ...]
        
        // Dividimos los datos: mitad para `courts`, mitad para `players`
        const middleIndex = Math.floor(rawData.length / 2);
        const courts = rawData.slice(0, middleIndex);
        const players = rawData.slice(middleIndex);

        // Generamos un número aleatorio para totalGames
        const totalGames = Math.floor(Math.random() * 200) + 50;

        setStats({ courts, players, totalGames });
      })
      .catch(() => {
        setError("No se pudieron cargar las estadísticas");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

 
 

  return (
    <div className={style.statisticsContainer}>
      {loading ? (
        <>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
          <p>
            <FormattedMessage id="profile.statistics.loading" />...
          </p>
        </>
      ) : (
        <>
          <h2 className={style.title}>
            <StatisticsIcon
              className={style.image}
              style={{ fill: "#E99E14" }}
              fill={"#E99E14"}
            />
            <FormattedMessage id="profile.statistics" />
          </h2>
  
          <div className={style.section}>
            <h3 className={style.subtitle}>
              <FormattedMessage id="profile.statistics.total" />:{" "}
              {stats?.totalGames ?? "0"}
            </h3>
          </div>
  
          <div className={style.chartsContainer}>
            <div className={style.chartBox}>
              <h3 className={style.chartTitle}>
                <FormattedMessage id="profile.statistics.court" />
              </h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={stats?.courts || []}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(1)}%)`
                  }
                >
                  {stats?.courts?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
  
            <div className={style.chartBox}>
              <h3 className={style.chartTitle}>
                <FormattedMessage id="profile.statistics.player" />
              </h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={stats?.players || []}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={100}
                  fill="#82ca9d"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(1)}%)`
                  }
                >
                  {stats?.players?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS_PLAYER[index % COLORS_PLAYER.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


export default StatisticsPage;