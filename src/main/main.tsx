import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/main.css";
import { useState } from "react";
import { Header } from "../header/Header";
import { AllTeams } from "../team/AllTeams";
import { RosterSearch } from "../team/RosterSearch";
import { FetchPlayers } from "../player/FetchPlayers";
import { ListTeams } from "../team/ListTeams";
import { ListPlayers } from "../player/ListPlayers";
import { FetchPlayerStats } from "../player/FetchPlayerStats";
import { FetchGames } from "../games/FetchGames";
import { ListGames } from "../games/ListGames";
import { FetchSingleGame } from "../games/FetchSingleGame";

function Main() {
  const [selectedTeamID, setSelectedTeamID] = useState<number | null>(null);
  const handleTeamSelection = (teamId: number) => {
    setSelectedTeamID(teamId);
  }
  const [playerID, setPlayerId] = useState<number | null>(null);
  const handlePlayerSelection = (playerId: number) => {
    setPlayerId(playerId);
  }
  const [gameID, setGameID] = useState<number | null>(null);
  const handleGameSelection = (gameId: number) => {
    setGameID(gameId);
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
              <RosterSearch onSelectTeam={handleTeamSelection} />
              {selectedTeamID && <FetchPlayers teamId={selectedTeamID} />}
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="stats">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <ListTeams onSelectTeam={handleTeamSelection} />
              {selectedTeamID && <ListPlayers teamId={selectedTeamID} setPlayerID={handlePlayerSelection} />}
              {playerID && <FetchPlayerStats playerId={playerID} />}
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="games">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <ListTeams onSelectTeam={handleTeamSelection} />
              {selectedTeamID && <FetchGames teamId={selectedTeamID} />}
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="gamestats">
          <div className="card mx-5 mb-5">
            <div className="card-header"></div>
            <div className="card-body">
              <ListTeams onSelectTeam={handleTeamSelection} />
              {!gameID && selectedTeamID && <ListGames teamId={selectedTeamID} onSelectGame={handleGameSelection} />}
              {gameID && <FetchSingleGame selectedGameId={gameID} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;