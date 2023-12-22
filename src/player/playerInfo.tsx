import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/playerInfo.css';


export const PlayerInfo: React.FC<{ teamId: number }> = ({ teamId }) => {
  const [players, setPlayers] = useState<any>([]);

  const positionMap: { [key: string]: string } = {
    C: 'Central',
    G: 'Guard',
    F: 'Forward',
    '': 'N/A'
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/players',
        params: {
          page: '0',
          per_page: '25',
          team_id: teamId
        },
        headers: {
          'X-RapidAPI-Key': '73d402b351msh8faee717dec24cfp1f4e49jsn1bdd24a1b8af',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setPlayers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [teamId]);

  return (
    <ul>
      {players.map((player: any) => (
        <li style={{ listStyleType: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={player.id}>
          {player.first_name} {player.last_name} - {positionMap[player.position]}
        </li>
      ))}
    </ul>
  );
};
