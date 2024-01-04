import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ListPlayers: React.FC<{ teamId: number; savePlayerForStats: (player: any) => void }> = ({ teamId, savePlayerForStats }) => {
  const [players, setPlayers] = useState<any>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
      {!selectedPlayer && (
        <h4>Select a Player:</h4>
      )}

      {!selectedPlayer && (
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

      {selectedPlayer && (
        <p>
          {selectedPlayer}
        </p>
      )}
    </div>
  );
};
