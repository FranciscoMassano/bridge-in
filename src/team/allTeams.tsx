import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/allTeams.css';
import { FetchTeamsData } from './FetchTeamData';

export const AllTeams = () => {
  const renderTeams = (teams: any) => (
    <ul className="team-ul" style={{ listStyleType: 'none', padding: 0 }}>
      {teams.map((team: any) => (
        <li key={team.id}>{team.full_name}</li>
      ))}
    </ul>
  );

  return (
    <div className="teams-list-container">
      <div className="team-list">
        <FetchTeamsData render={renderTeams} />
      </div>
      <div className="team-list">
        <FetchTeamsData render={renderTeams} />
      </div>
    </div>
  );
};