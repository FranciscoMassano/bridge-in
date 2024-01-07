import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/main.css";
import { useEffect, useState } from "react";
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


const renderCard = (children: React.ReactNode, title: string, description: string) => (
  <div className="card-container">
    <h1 className="card-title">{title}</h1>
    <h3 className="card-description">{description}</h3>
    <div>
      {children}
    </div>
  </div>
);

function Main() {
  const [selectedTeamID, setSelectedTeamID] = useState<number | null>(null);
  const [playerID, setPlayerId] = useState<number | null>(null);
  const [gameID, setGameID] = useState<number | null>(null);

  const resetIDs = () => {
    setSelectedTeamID(null);
    setPlayerId(null);
    setGameID(null);
  };
  const handleTeamSelection = (teamId: number) => {
    setSelectedTeamID(teamId);
  }
  const handlePlayerSelection = (playerId: number) => {
    setPlayerId(playerId);
  }
  const handleGameSelection = (gameId: number) => {
    setGameID(gameId);
  };
  return (
    <div className="main flex-wrap">
      <Header />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" id="teams-tab" data-bs-toggle="tab" href="#teams" onClick={resetIDs}>
            Challenge #1
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#roster" onClick={resetIDs}>
            Challenge #2

          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#stats" onClick={resetIDs}>
            Challenge #3
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#games" onClick={resetIDs}>
            Challenge #4
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="roster-tab" data-bs-toggle="tab" href="#gamestats" onClick={resetIDs}>
            Challenge #5
          </a>
        </li>
      </ul>
      <div className="tab-content d-flex align-items-center justify-content-center">
        <div className="tab-pane fade show active" id="teams">
          {renderCard(<AllTeams />, 'List all Teams', 'Organized by division ')}
        </div>
        <div className="tab-pane fade" id="roster">
          {renderCard(
            <>
              <RosterSearch onSelectTeam={handleTeamSelection} />
              {selectedTeamID && <FetchPlayers teamId={selectedTeamID} />}
            </>, 'Show a team roster (list all players for a given team)', 'Write a name of a team to display its roster, start with a letter for suggestions and press on the desired one'
          )}
        </div>
        <div className="tab-pane fade" id="stats">
          {renderCard(
            <>
              <ListTeams onSelectTeam={handleTeamSelection} />
              {selectedTeamID && <ListPlayers teamId={selectedTeamID} setPlayerID={handlePlayerSelection} />}
              {playerID && <FetchPlayerStats playerId={playerID} />}
            </>, 'Show the stats of a player of a given teams', 'Select a team to display the players, select a player to display his stats'
          )}
        </div>
        <div className="tab-pane fade" id="games">
          {renderCard(
            <>
              <ListTeams onSelectTeam={handleTeamSelection} />
              {selectedTeamID && <FetchGames teamId={selectedTeamID} />}
            </>, 'List all games of a given team', 'Select a team to display the games available for that team'
          )}
        </div>
        <div className="tab-pane fade" id="gamestats">
          {renderCard(
            <>
              <ListTeams onSelectTeam={handleTeamSelection} />
              {!gameID && selectedTeamID && <ListGames teamId={selectedTeamID} onSelectGame={handleGameSelection} />}
              {gameID && <FetchSingleGame selectedGameId={gameID} />}
            </>, 'Show the stats from any game of a given team', 'Select a team to display the games available for that team, select a game to display its stats'
          )}

        </div>
      </div>
    </div>
  );
}
export default Main;