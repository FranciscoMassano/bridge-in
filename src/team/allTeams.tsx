import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/allTeams.css';
export const AllTeams = () => {
  const [teams, setTeams] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/teams',
        params: { page: '0' },
        headers: {
          'X-RapidAPI-Key': '73d402b351msh8faee717dec24cfp1f4e49jsn1bdd24a1b8af',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setTeams(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="teams-list-container">
      <div className="team-list">
        <ul className="team-ul" style={{ listStyleType: 'none', padding: 0 }}>
          {teams.slice(0, Math.ceil(teams.length / 2)).map((team: any) => (
            <li className="team-li" key={team.id}>{team.full_name}</li>
          ))}
        </ul>
      </div>
      <div className="team-list">
        <ul className="team-ul" style={{ listStyleType: 'none', padding: 0 }}>
          {teams.slice(Math.ceil(teams.length / 2)).map((team: any) => (
            <li className="team-li" key={team.id}>{team.full_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};