import React, { useEffect, useState } from "react";
import { Header } from "../header/Header";
import "../styles/main.css";
import { AllTeams } from "../team/AllTeams";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RosterSearch } from "../team/RosterSearch";
import { FetchPlayers } from "../player/FetchPlayers";

function Main() {
  const [rosterTeamId, setRosterTeamId] = useState<number | null>(null);
  const [allPlayers, setAllPlayers] = useState<any>(null);

  useEffect(() => {
    console.log("Selected Team ID in Roster:", rosterTeamId);
  }, [rosterTeamId]);

  const handleSelectRosterTeam = (teamId: number) => {
    setRosterTeamId(teamId);
  };

  const saveAllPlayers = (players: any) => {
    setAllPlayers(players);
    console.log("All Players Data:", players);
  };

  return (
    <div className="main d-flex flex-wrap">
      <Header />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" id="teams-tab" data-bs-toggle="tab" href="#teams">
            List all teams
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#roster">
            Show team roster
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#roster">
            Show player stats
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#roster">
            List games from team
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#roster">
            Show stats
          </a>
        </li>
      </ul>
      <div className="tab-content d-flex align-items-center justify-content-center">
        <div className="tab-pane fade show active" id="teams">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <AllTeams />
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="roster">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <RosterSearch onSelectTeam={handleSelectRosterTeam} />
              {rosterTeamId && <FetchPlayers teamId={rosterTeamId} setAllPlayers={saveAllPlayers} />}
            </div>
          </div>
        </div>
        {/* Add more tab panes as needed */}
      </div>
    </div>
  );
}

export default Main;
