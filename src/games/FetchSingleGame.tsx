import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormatDate from '../helpers/FormatDate';

interface FetchSingleGameProps {
  selectedGameId: number | null;
}
export const FetchSingleGame: React.FC<FetchSingleGameProps> = ({ selectedGameId }) => {
  const [gameInfo, setGameInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchSingleGame = async () => {
      if (selectedGameId) {
        const options = {
          method: 'GET',
          url: `https://free-nba.p.rapidapi.com/games/${selectedGameId}`,
          headers: {
            'X-RapidAPI-Key': '73d402b351msh8faee717dec24cfp1f4e49jsn1bdd24a1b8af',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
          },
        };

        try {
          const response = await axios.request(options);
          setGameInfo(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchSingleGame();
  }, [selectedGameId]);

  return (
    <div>
      <h4>Game Information:</h4>
      {selectedGameId && !gameInfo && <p>Loading game information...</p>}
      {gameInfo && (
        <div>
          <p>Season: {gameInfo.season} ({gameInfo.postseason === true ? 'Post Season' : 'Regular Season'}) </p>
          <p>Date: {FormatDate(gameInfo.date)}</p>
          <p>Home Team: {gameInfo.home_team.full_name}</p>
          <p>Visitor Team: {gameInfo.visitor_team.full_name}</p>
          <p>Score: {gameInfo.home_team_score} - {gameInfo.visitor_team_score}</p>
        </div>
      )}
    </div>
  );
};
