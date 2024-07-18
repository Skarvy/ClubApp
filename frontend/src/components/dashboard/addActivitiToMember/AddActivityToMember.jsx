import React, { useState, useEffect } from 'react';

const AddActivityToMember = () => {
  const [dni, setDNI] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [memberExist, setMemberExist] = useState(false);

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
      console.error('Error fetching activities:', error);
    }
  };

  const handleCheckMemberExistence = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dni/${dni}`);
      if (!response.ok) {
        throw new Error('Error al buscar el miembro por DNI');
      }
      const data = await response.json();
      console.log('Member data:', data);
      if (data && data._id) {
        setMemberData(data);
        setMemberExist(true);
        setMensaje('');
      } else {
        setMemberData(null);
        setMemberExist(false);
        setMensaje('No se encontró ningún miembro con ese DNI');
      }
    } catch (error) {
      console.error('Error checking member existence:', error);
      setMensaje('Error al buscar el miembro por DNI');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!memberExist) {
        throw new Error('Debe confirmar la existencia del socio antes de agregar la actividad');
      }
  
      // Enviar la solicitud al backend para agregar la actividad al miembro
      const response = await fetch(`http://localhost:5000/api/members/${memberData._id}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: selectedActivity,
          descripcion: '', // Agrega la descripción aquí
          fechaDeInscripcion: new Date().toISOString(),
          fechaDeUltimoPago: new Date().toISOString() // Agrega la fecha de último pago aquí
        })
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar la actividad al miembro');
      }
  
      setMensaje('Actividad agregada al miembro exitosamente');
    } catch (error) {
      console.error('Error:', error);
      setMensaje(error.message);
    }
  };
  

  return (
    <div className="container mt-4">
    <h2>Agregar Actividad a Miembro</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="dni">DNI del Miembro:</label>
        <input
          type="text"
          id="dni"
          className="form-control"
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
          required
        />
      </div>
      <button type="button" className="btn btn-info mb-3" onClick={handleCheckMemberExistence}>
        Confirmar Existencia del Socio
      </button>
      {memberData && (
        <div className="alert alert-secondary">
          <p><strong>Nombre:</strong> {memberData.nombre}</p>
          <p><strong>Apellido:</strong> {memberData.apellido}</p>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="actividad">Actividad:</label>
        <select
          id="actividad"
          className="form-control"
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          required
        >
          <option value="">Seleccione una actividad</option>
          {activities.map((activity) => (
            <option key={activity._id} value={activity.nombre}>
              {activity.nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Agregar Actividad
      </button>
    </form>
    {mensaje && <p className="alert alert-success mt-3">{mensaje}</p>}
    
  </div>
  );
};

export default AddActivityToMember;
