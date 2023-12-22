import { Header } from "../header/Header";
import '../styles/main.css';
import { RosterSearch } from "../team/RosterSearch";
import { AllTeams } from "../team/AllTeams";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Main() {

  const handleSelectTeam = (teamId: number) => {
    console.log('Selected Team ID:', teamId);
  };

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

        <div className="card mx-5 mb-5">
          <div className="card-header">Challenge Nº2 - Show team roster</div>
          <div className="card-body">
            <RosterSearch onSelectTeam={handleSelectTeam} />
          </div>
        </div>

        <div className="card mx-5 mb-5">
          <div className="card-header">Another Challenge</div>
          <div className="card-body">
          </div>
        </div>

        <div className="card mx-5 mb-5">
          <div className="card-header">Another Challenge</div>
          <div className="card-body">Content</div>
        </div>

        <div className="card mx-5 mb-5">
          <div className="card-header">Another Challenge</div>
          <div className="card-body">Content</div>
        </div>
      </div>
    </div>
  );
}

export default Main;