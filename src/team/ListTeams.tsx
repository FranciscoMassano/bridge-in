import React, { useState } from 'react';
import { FetchTeams } from './FetchTeams';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const ListTeams: React.FC<{ onSelectTeam: (teamId: number) => void }> = ({ onSelectTeam }) => {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [teams, setTeams] = useState<any[]>([]);

  const handleTeamSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = parseInt(event.target.value);
    setSelectedTeamId(teamId);
    onSelectTeam(teamId);
  };

  return (
    <div>
      {!selectedTeamId && <h4>Select a Team:</h4>}
      {!selectedTeamId && <FetchTeams
        render={(teamsData: any[]) => {
          setTeams(teamsData);
          return (
            <select
              className="form-select"
              value={selectedTeamId || ''}
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
      />}
      {selectedTeamId && <p>{teams.find((team) => team.id === selectedTeamId)?.full_name}</p>}
    </div>
  );
};
