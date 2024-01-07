import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { TotalPagesReadFromAPI } from '../helpers/constants';

export const ListPlayers: React.FC<{ teamId: number; savePlayerForStats: (player: any) => void }> = ({ teamId, savePlayerForStats }) => {
  const [players, setPlayers] = useState<any>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
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

      } finally {
        setLoading(false);
      }


    };

    fetchData();
  }, [teamId]);

  const handlePlayerSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const playerId = parseInt(event.target.value, 10);
    setSelectedPlayer(playerId);
    savePlayerForStats(playerId);
  };

  return (
    <div>
      {loading && <p>Loading players...</p>}
      {!loading && players.length === 0 && <p>No players available.</p>}

      {!selectedPlayer && !loading && (
        <h4>Select a Player:</h4>
      )}

      {!selectedPlayer && !loading && (
        <select
          className="form-select"
          value={selectedPlayer || ''}
          onChange={handlePlayerSelection}
        >
          <option value="" disabled>
            Select a player
          </option>
          {players.map((player: any) => (
            <option key={player.id} value={player.id}>
              {player.first_name} {player.last_name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
