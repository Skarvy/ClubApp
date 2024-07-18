import React, { useState, useEffect } from 'react';

const ActivitiesTable = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/activities');
      if (!response.ok) {
        throw new Error('Error al obtener las actividades');
      }
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la actividad');
      }
      // Actualizar la lista de actividades después de eliminar
      const updatedActivities = activities.filter(activity => activity._id !== id);
      setActivities(updatedActivities);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModifyActivity = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ /* Aquí puedes enviar los nuevos datos de la actividad */ })
      });
      if (!response.ok) {
        throw new Error('Error al modificar la actividad');
      }
      // Aquí podrías manejar la confirmación de que la actividad fue modificada correctamente
      console.log('Actividad modificada exitosamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
    <h2>Tabla de Actividades</h2>
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Nombre de la Actividad</th>
          <th>Descripción</th>
          <th>Horarios</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity._id}>
            <td>{activity.nombre}</td>
            <td>{activity.descripcion}</td>
            <td>
              <ul className="list-unstyled">
                {activity.horarios.map((horario, index) => (
                  <li key={index}>{horario.dia} - {horario.horaInicio} a {horario.horaFin}</li>
                ))}
              </ul>
            </td>
            <td>
              <button className="btn btn-danger btn-sm mr-2" onClick={() => handleDeleteActivity(activity._id)}>
                Eliminar
              </button>
              <button className="btn btn-warning btn-sm" onClick={() => handleModifyActivity(activity._id)}>
                Modificar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default ActivitiesTable;
