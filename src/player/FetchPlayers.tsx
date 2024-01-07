import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/fetchPlayers.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { TotalPagesReadFromAPI } from '../helpers/constants';

export const FetchPlayers: React.FC<{ teamId: number }> = ({ teamId }) => {
  const [players, setPlayers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      const totalPages = TotalPagesReadFromAPI;
      let allPlayers: any[] = [];
      let uniquePlayerIds = new Set();
      try {
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
          //Some IDs are duplicated in the response
          playersInTeam.forEach((player: any) => {
            if (!uniquePlayerIds.has(player.id)) {
              allPlayers.push(player);
              uniquePlayerIds.add(player.id);
            }
          });
        }
        setPlayers(allPlayers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);
  return (
    <div>
      {loading && <p className='information'>Loading players...</p>}
      {!loading && players.length === 0 && <p className='information'>No players available for this team.</p>}
      {!loading && players.length > 0 && (
        <ul className='player-list'>
          {players.map((player: any) => (
            <li className='player-list' key={player.id}>{player.first_name} {player.last_name} </li>
          ))}
        </ul>
      )}
    </div>
  );
};