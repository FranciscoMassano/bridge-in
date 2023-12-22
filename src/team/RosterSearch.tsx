import React, { useState } from 'react';
import { FetchTeamsData } from './FetchTeamData';
import '../styles/rosterSearch.css';
import { PlayerInfo } from '../player/PlayerInfo';

export const RosterSearch: React.FC<any> = ({ onSelectTeam }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<{ id: number | null; name: string }>({
    id: null,
    name: '',
  });
  const [isListVisible, setIsListVisible] = useState<boolean>(true);

  const handleSelectTeam = (teamId: number, teamName: string) => {
    setSelectedTeam({ id: teamId, name: teamName });
    onSelectTeam(teamId, teamName);
    setIsListVisible(false);
    setSearchTerm('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsListVisible(true);
  };

  return (
    <div className="team-search-container">
      <input
        type="text"
        value={selectedTeam.name || searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a team"
      />

      {isListVisible && searchTerm && (
        <div>
          <FetchTeamsData
            render={(teams: any) => (
              <ul className="autocomplete-list">
                {teams
                  .filter(
                    (team: any) =>
                      team.full_name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((team: any) => (
                    <li
                      key={team.id}
                      onClick={() => handleSelectTeam(team.id, team.full_name)}
                    >
                      {team.full_name}
                    </li>
                  ))}
              </ul>
            )}
          />
        </div>
      )}

      {selectedTeam.id !== null && (
        <div style={{ marginTop: '20px' }}>
          <h2>{selectedTeam.name} Roster</h2>
          <PlayerInfo teamId={selectedTeam.id} />
        </div>
      )}
    </div>
  );
};
