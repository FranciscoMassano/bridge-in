import { Header } from "../header/header";
import PlayerInfo from "../player/playerInfo";
import '../styles/main.css';
import { AllTeams } from "../team/allTeams";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Main() {
  return (
    <div className="main d-flex flex-wrap">
      <Header />
      <div className="challange-container d-flex flex-wrap">
        <div className="card mx-5 mb-5">
          <div className="card-header">Challenge Nº1 - List all teams</div>
          <div className="card-body">
            <AllTeams />
          </div>
        </div>

        {/* Add more cards as needed */}
        <div className="card mx-5 mb-5">
          <div className="card-header">Another Challenge</div>
          <div className="card-body">
            {/* Content for the second card */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;