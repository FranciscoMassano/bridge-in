import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FetchTeamsData: React.FC<any> = ({ render }) => {
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
  }, []);

  return render(teams);
};