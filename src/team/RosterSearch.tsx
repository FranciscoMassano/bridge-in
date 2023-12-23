import React, { useState } from 'react';
import { FetchTeams } from './FetchTeams';
import '../styles/rosterSearch.css';

export const RosterSearch: React.FC<any> = ({ onSelectTeam }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [isListVisible, setIsListVisible] = useState<boolean>(true);
  const [teamName, setTeamName] = useState<string>('');

  const handleSelectTeam = (teamId: number, teamName: string) => {
    setSelectedTeamId(teamId);
    onSelectTeam(teamId);
    setIsListVisible(false);
    setSearchTerm('');
    setTeamName(teamName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsListVisible(true);
  };

  return (
    <div className="team-search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={"Search for a team"}
      />

      {isListVisible && searchTerm && (
        <div className="autocomplete-list">
          <FetchTeams
            render={(teams: any) => (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {teams
                  .filter(
                    (team: any) =>
                      team.full_name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((team: any) => (
                    <li key={team.id} onClick={() => handleSelectTeam(team.id, team.full_name)}>
                      {team.full_name}
                    </li>
                  ))}
              </ul>
            )}
          />
        </div>
      )}

      {selectedTeamId !== null && <h1> {teamName} Roster</h1>}
    </div>
  );
};
