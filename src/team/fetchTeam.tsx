import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface TeamsFetcherProps {
  render: (teams: any[]) => React.ReactNode;
}
const TeamsFetcher: React.FC<TeamsFetcherProps> = ({ render }) => {
  const [teams, setTeams] = useState([]);

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

  return render(teams);
};

export default TeamsFetcher;
