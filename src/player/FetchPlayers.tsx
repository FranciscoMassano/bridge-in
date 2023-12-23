import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/fetchPlayers.css';


export const FetchPlayers: React.FC<{ teamId: number; setAllPlayers: (players: any[]) => void }> = ({ teamId, setAllPlayers }) => {
  const [players, setPlayers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      /**
       *       
        Use the code below to use the paid version of the API. 

        const data = await axios.request(
          {
            method: 'GET',
            url: 'https://free-nba.p.rapidapi.com/players',
            params: {
              page: '0',
              per_page: '25',
            },
            headers: {
              'X-RapidAPI-Key': 'your-key',
              'X-RapidAPI-Host': 'your-paid-host',
            },
          });

          const totalPages = data.data.meta.total_pages;
       */

      const totalPages = 29;
      let allPlayers: any[] = [];

      for (let page = 0; page <= totalPages; page++) {
        const response = await axios.request({
          method: 'GET',
          url: 'https://free-nba.p.rapidapi.com/players',
          params: {
            page: page.toString(),
            per_page: '25',
          },
          headers: {
            'X-RapidAPI-Key': '73d402b351msh8faee717dec24cfp1f4e49jsn1bdd24a1b8af',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
          },
        });

        const playersInTeam = response.data.data.filter((player: any) => player.team.id === teamId);
        allPlayers = [...allPlayers, ...playersInTeam];
        if (page % 2 === 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      setPlayers(allPlayers);
      console.log('All Players Data:', allPlayers);
    };

    fetchData();
  }, [teamId, setAllPlayers]);
  return (
    <div>
      <ul className='player-list'>
        {players.map((player: any) => (
          <li className='player-list' key={player.id}>{player.first_name} {player.last_name} </li>
        ))}
      </ul>
    </div>
  );
};