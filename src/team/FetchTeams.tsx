import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FetchTeams: React.FC<any> = ({ render }) => {
  const [teams, setTeams] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/teams',
        params: { page: '0' },
        headers: {
          'X-RapidAPI-Key': '73d402b351msh8faee717dec24cfp1f4e49jsn1bdd24a1b8af',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
        },
      };

      try {
        let allTeams: any[] = [];
        let currentPage = 1;
        let totalPages = 2;

        do {
          const response = await axios.request({
            ...options,
            params: { page: currentPage.toString() },
          });

          allTeams = [...allTeams, ...response.data.data];

          if (response.data.meta.total_pages) {
            totalPages = response.data.meta.total_pages;
          }

          currentPage++;
        } while (currentPage <= totalPages);

        setTeams(allTeams);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return render(teams);
};
