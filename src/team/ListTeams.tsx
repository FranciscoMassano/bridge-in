import React, { useState } from 'react';
import { FetchTeams } from './FetchTeams';

export const ListTeams: React.FC<{ onSelectTeam: (teamId: number) => void }> = ({ onSelectTeam }) => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState<any[]>([]);

  const handleTeamSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = parseInt(event.target.value, 10);
    setSelectedTeam(teamId);
    onSelectTeam(teamId);
  };

  return (
    <div>
      <h4>Select a Team:</h4>
      <FetchTeams
        render={(teamsData: any[]) => {
          setTeams(teamsData);
          return (
            <select
              className="form-select"
              value={selectedTeam || ''}
              onChange={handleTeamSelection}
            >
              <option value="" disabled>
                Select a team
              </option>
              {teamsData.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.full_name}
                </option>
              ))}
            </select>
          );
        }}
      />
      {selectedTeam && <p>Selected Team: {teams.find((team) => team.id === selectedTeam)?.full_name}</p>}
    </div>
  );
};
