import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/playerInfo.css';


const PlayerList = () => {
  const [players, setPlayers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/players',
        params: {
          page: '0',
          per_page: '25',
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
  }, []);

  return (
    <div className="accordion-container">
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="playerListHeader">
            <div
              className="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#playerListCollapse"
              aria-expanded="true"
              aria-controls="playerListCollapse"
            >
              Player List
            </div>
          </h2>
          <div
            id="playerListCollapse"
            className="accordion-collapse collapse show"
            aria-labelledby="playerListHeader"
            data-bs-parent="#accordion"
          >
            <div className="accordion-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Height</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player: any) => (
                    <tr key={player.id}>
                      <td>{player.first_name}</td>
                      <td>{player.last_name}</td>
                      <td>
                        {player.height_feet !== null && player.height_inches !== null
                          ? `${player.height_feet}'${player.height_inches}"`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
