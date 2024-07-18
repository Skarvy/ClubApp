
import { Link } from 'react-router-dom';
import ClubAccess from './components/socioaccess/ClubAccess';


const App = () => {
  return (
    <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/socios">Socios</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Admin</Link>
        </li>
      </ul>
    </nav>
    <ClubAccess />
  </div>
  );
};

export default App;
