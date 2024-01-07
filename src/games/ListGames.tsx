import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TotalPagesReadFromAPI } from '../helpers/constants';

interface ListGamesProps {
  onSelectGame: (gameId: number) => void;
}

export const ListGames: React.FC<{ teamId: number | null, onSelectGame: (gameId: number) => void }> = ({ onSelectGame, teamId }) => {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const totalPages = TotalPagesReadFromAPI;
      let allGames: any[] = [];
      if (teamId) {
        try {
          for (let page = 0; page <= totalPages; page++) {
            const response = await axios.request({
              method: 'GET',
              url: 'https://free-nba.p.rapidapi.com/games',
              params: {
                page: page.toString(),
                per_page: '25',
              },
              headers: {
                'X-RapidAPI-Key': '73d402b351msh8faee717dec24cfp1f4e49jsn1bdd24a1b8af',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
              },
            });
            allGames = response.data.data.filter((game: any) => game.home_team.id === teamId || game.visitor_team.id === teamId);
          }


          setGames(allGames);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGames();
  }, [teamId]);

  const handleGameSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gameId = parseInt(event.target.value);
    setSelectedGameId(gameId);
    onSelectGame(gameId);
  };

  return (
    <div>
      {loading && <p>Loading games...</p>}
      {!loading && games.length === 0 && <p>No games available.</p>}
      {!loading && games.length > 0 && (
        <select
          className="form-select"
          value={selectedGameId || ''}
          onChange={handleGameSelection}
        >
          <option value="" disabled>
            Select a game
          </option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {`${game.home_team.full_name} vs ${game.visitor_team.full_name}`}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
