// Import statement correction
import { FetchTeams } from './FetchTeams';
import '../styles/allTeams.css';

export const AllTeams = () => {
  const renderTeams = (teams: any) => {
    const teamsByDivision: { [key: string]: any[] } = {};

    teams.forEach((team: any) => {
      const division = team.division || 'No';
      teamsByDivision[division] = [...(teamsByDivision[division] || []), team];
    });

    return (
      <div className="teams-list-container d-flex">
        {Object.entries(teamsByDivision).map(([division, divisionTeams]) => (
          <div className="team-list" key={division}>
            <h2>{division} Division</h2>
            <ul className="team-ul" style={{ listStyleType: 'none', padding: 0 }}>
              {divisionTeams.map((team: any) => (
                <li key={team.id}>
                  {team.full_name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="teams-list-container">
      <FetchTeams render={renderTeams} />
    </div>
  );
};
