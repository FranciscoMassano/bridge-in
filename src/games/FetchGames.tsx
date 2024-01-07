import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/fetchGames.css';
import FormatDate from '../helpers/FormatDate';
import { TotalPagesReadFromAPI } from '../helpers/constants';

export const FetchGames: React.FC<{ teamId: number | null }> = ({ teamId }) => {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div>
      {loading && <p>Loading games...</p>}
      {!loading && games.length === 0 && <p>No games available for this team.</p>}
      {!loading && games.length > 0 && (
        <ul className='game-list'>
          {games.map((game) => (
            <li key={game.id}>
              <h3 className='game-list-item'> Season: {game.season} </h3>
              <p className='game-list-item'>{FormatDate(game.date)}</p>
              {game.postseason && <p className='game-list-item'>Post Season</p>}
              {!game.postseason && <p className='game-list-item'>Regular Season</p>}
              <p>{game.home_team.full_name} {game.home_team_score} vs {game.visitor_team_score} {game.visitor_team.full_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
