function Match(props: { fecha: string, start_time: string, end_time: string, current_players: number, max_players: number}) {
  return (
    <div>
      <h2>Fecha: {props.fecha}</h2>
      <h2> {props.start_time} - {props.end_time}</h2>
      <h2>Likes: {props.current_players}/{props.max_players}</h2>
    </div>
  );
 }
  

function LoginPage() {
  return (
    <div>
      <Match fecha="2025-12-06" start_time="20:00" end_time="22:00" current_players={4} max_players={5} />
    </div>
  );
}

export default LoginPage;
