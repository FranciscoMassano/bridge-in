import React, { useEffect, useState } from "react";
import { Header } from "../header/Header";
import "../styles/main.css";
import { AllTeams } from "../team/AllTeams";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RosterSearch } from "../team/RosterSearch";
import { FetchPlayers } from "../player/FetchPlayers";
import { ListTeams } from "../team/ListTeams";
import { ListPlayers } from "../player/ListPlayers";
import { FetchPlayerStats } from "../player/FetchPlayerStats";
import { FetchGames } from "../games/FetchGames";
import { ListGames } from "../games/ListGames";
import { FetchSingleGame } from "../games/FetchSingleGame";

function Main() {
  const [rosterTeamId, setRosterTeamId] = useState<number | null>(null);
  const [statsTeamId, setStatsTeamId] = useState<number | null>(null);
  const [statsGamesId, setStatsGamesId] = useState<number | null>(null);
  const [statsPlayerId, setStatsPlayerId] = useState<number | null>(null);
  const [allPlayers, setAllPlayers] = useState<any>(null);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const handleSelectRosterTeam = (teamId: number) => {
    setRosterTeamId(teamId);
  };

  const handleSelectStatsTeam = (teamId: number) => {
    setStatsTeamId(teamId);
  };

  const handleSelectGamesTeam = (teamId: number) => {
    setStatsGamesId(teamId);
  };

  const saveAllPlayers = (players: any) => {
    setAllPlayers(players);
  };

  const savePlayerForStats = (player: any) => {
    setStatsPlayerId(player);
  };

  const handleSelectGame = (gameId: number) => {
    setSelectedGameId(gameId);
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
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#stats">
            Show player stats
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#games">
            List games from team
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#gamestats">
            Show stats from game
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
        <div className="tab-pane fade" id="stats">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <ListTeams onSelectTeam={handleSelectStatsTeam} />
              {statsTeamId && <ListPlayers teamId={statsTeamId} savePlayerForStats={savePlayerForStats} />}
              {statsPlayerId && <FetchPlayerStats playerId={statsPlayerId} />}
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="games">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <ListTeams onSelectTeam={handleSelectGamesTeam} />
              {statsGamesId && <FetchGames teamId={statsGamesId} />}
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="gamestats">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <ListTeams onSelectTeam={handleSelectGamesTeam} />
              {!selectedGameId && statsGamesId && <ListGames teamId={statsGamesId} onSelectGame={handleSelectGame} />}
              {selectedGameId && <FetchSingleGame selectedGameId={selectedGameId} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;