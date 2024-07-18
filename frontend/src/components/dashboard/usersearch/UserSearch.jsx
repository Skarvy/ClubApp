import React, { useState, useEffect } from 'react';

const UserSearch = () => {
  const [dni, setDNI] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setUserData(null);
    setError(null);
    setNewUserData({});
  }, [dni]);

  const handleSearchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dni/${dni}`);
      if (!response.ok) {
        throw new Error('No se pudo encontrar al socio');
      }
      const data = await response.json();

      // Convertir las fechas de inscripción de cadena de texto a objetos Date válidos
      const updatedData = {
        ...data,
        actividades: data.actividades.map(activity => ({
          ...activity,
          fechaInscripcion: new Date(activity.fechaDeInscripcion) // Convertir fechaDeInscripcion a Date
        }))
      };

      // Filtrar las actividades para mostrar solo las últimas con el mismo nombre y descripción
      const filteredActivities = updatedData.actividades.reduce((accumulator, currentActivity) => {
        const existingActivityIndex = accumulator.findIndex(activity => activity.nombre === currentActivity.nombre && activity.descripcion === currentActivity.descripcion);
        if (existingActivityIndex !== -1) {
          if (currentActivity.fechaInscripcion > accumulator[existingActivityIndex].fechaInscripcion) {
            accumulator[existingActivityIndex] = currentActivity;
          }
        } else {
          accumulator.push(currentActivity);
        }
        return accumulator;
      }, []);

      // Ordenar las actividades por nombre y luego por fecha de inscripción
      filteredActivities.sort((a, b) => {
        if (a.nombre !== b.nombre) {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return a.fechaInscripcion - b.fechaInscripcion;
        }
      });

      setUserData({ ...updatedData, actividades: filteredActivities });
      setNewUserData({ ...updatedData, actividades: filteredActivities }); // También actualizamos newUserData para reflejar los cambios
      setError(null);
      setEditMode(false);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo encontrar al socio');
      setUserData(null);
      setNewUserData({});
      setEditMode(false);
    }
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/members/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });
      if (!response.ok) {
        throw new Error('No se pudo actualizar al socio');
      }
      setUserData(newUserData);
      setError(null);
      setEditMode(false);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo actualizar al socio');
    }
  };

  const handleDeleteActividad = async (index) => {
    try {
      const updatedActividades = [...userData.actividades];
      updatedActividades.splice(index, 1);
      const response = await fetch(`http://localhost:5000/api/members/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ actividades: updatedActividades }),
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar la actividad');
      }
      setUserData(prevState => ({ ...prevState, actividades: updatedActividades }));
      setNewUserData(prevState => ({ ...prevState, actividades: updatedActividades })); // También actualizamos newUserData para reflejar los cambios
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo eliminar la actividad');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Buscar Usuario por DNI</h2>
      <div className="form-group">
        <label htmlFor="dni">DNI:</label>
        <input
          type="text"
          id="dni"
          className="form-control"
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearchUser}>Buscar</button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {userData && (
        <div className="mt-4">
          <h3>Datos del Socio:</h3>
          <div className="mb-3">
            {editMode ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={newUserData.nombre || ''}
                  onChange={(e) => setNewUserData(prevState => ({ ...prevState, nombre: e.target.value }))}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={newUserData.apellido || ''}
                  onChange={(e) => setNewUserData(prevState => ({ ...prevState, apellido: e.target.value }))}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={newUserData.dni || ''}
                  onChange={(e) => setNewUserData(prevState => ({ ...prevState, dni: e.target.value }))}
                />
              </div>
            ) : (
              <div>
                <p>Nombre: {userData.nombre}</p>
                <p>Apellido: {userData.apellido}</p>
                <p>DNI: {userData.dni}</p>
              </div>
            )}
          </div>
          {editMode ? (
            <button className="btn btn-success" onClick={handleUpdateUser}>Guardar Cambios</button>
          ) : (
            <button className="btn btn-secondary" onClick={handleEditModeToggle}>Editar</button>
          )}
          <h3 className="mt-4">Actividades:</h3>
          <table className="table table-striped mt-2">
            <thead>
              <tr>
                <th>Nombre de la Actividad</th>
                <th>Descripción</th>
                <th>Fecha de Inscripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {userData.actividades.map((actividad, index) => (
                <tr key={index}>
                  <td>{actividad.nombre}</td>
                  <td>{actividad.descripcion}</td>
                  <td>{new Date(actividad.fechaInscripcion).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteActividad(index)}>Eliminar Actividad</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
