import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateMember from '../CreateMember/CreateMember';
import AddActivityToMember from '../addActivitiToMember/AddActivityToMember'
import AddActivities from '../addactivities/AddActivities';
import ActivitiesTable from '../tableactivities/ActivitiesTable'
import UserSearch from '../usersearch/UserSearch';
import Clock from '../../clock/Clock';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'crear-socio':
        return <CreateMember />;
      case 'buscar-socio':
        return <UserSearch />;
      case 'agregar-actividad-socio':
        return <AddActivityToMember />;
      case 'actividades':
        return <ActivitiesTable />;
      case 'agregar-actividades':
        return <AddActivities />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <Clock />
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item mx-3">
            <Link className="nav-item " to="/">
              Home
            </Link>
          </li>
          <li className="nav-item mx-3" onClick={() => setSelectedOption('crear-socio')}>
            Crear Socio Nuevo
          </li>
          <li className="nav-item mx-3" onClick={() => setSelectedOption('buscar-socio')}>
            Buscar Socio
          </li>
          <li className="nav-item mx-3" onClick={() => setSelectedOption('agregar-actividad-socio')}>
            Agregar Actividad al Socio
          </li>
          <li className="nav-item mx-3" onClick={() => setSelectedOption('agregar-actividades')}>
            Agregar Actividades
          </li>
          <li className="nav-item mx-3" onClick={() => setSelectedOption('actividades')}>
            Actividades
          </li>
        </ul>
      </nav>
      {renderComponent()}
    </div>
  );
};

export default Dashboard;
