
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface FetchPlayerStatsProps {
	playerId: number;
}

const positionMapping = (position: string): string => {
	switch (position) {
		case 'C':
			return 'Central';
		case 'G':
			return 'Guard';
		case 'G-F' || 'F-G':
			return 'Forward Guard';
		case 'F':
			return 'Forward';
		case 'C-F' || 'F-C':
			return 'Center Forward';
		case 'C':
			return 'Center';
		default:
			return 'N/A';
	}
}
export const FetchPlayerStats: React.FC<FetchPlayerStatsProps> = ({ playerId }) => {
	const [playerStats, setPlayerStats] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const options = {
				method: 'GET',
				url: `https://free-nba.p.rapidapi.com/players/${playerId}`,
				headers: {
					'X-RapidAPI-Key': '73d402b351msh8faee717dec24cfp1f4e49jsn1bdd24a1b8af',
					'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
				},
			};

			try {
				const response = await axios.request(options);
				setPlayerStats(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		if (playerId) {
			fetchData();
		}
	}, []);

	return (
		<div>
			{playerStats && (
				<div>
					<h4>Player Stats:</h4>
					<p>Name: {playerStats.first_name} {playerStats.last_name}</p>
					<p>Position: {positionMapping(playerStats.position)}</p>
					{playerStats.height_feet && <p>Height: {playerStats.height_feet}ft {playerStats.height_inches}in</p>}
					{playerStats.weight_pounds && <p>Weight: {playerStats.weight_pounds}lbs</p>}
					<p>Team: {playerStats.team.full_name}</p>
					<p>{playerStats.team.conference} Conference</p>
					<p>{playerStats.team.division} Division</p>
				</div>
			)}
		</div>
	);
};