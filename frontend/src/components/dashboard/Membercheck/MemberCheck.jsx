import React, { useState } from 'react';

const MemberCheck = () => {
  const [dni, setDNI] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckMember = async () => {
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
  
      // Ordenar las actividades por nombre y luego por fecha de inscripción
      updatedData.actividades.sort((a, b) => {
        if (a.nombre !== b.nombre) {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return a.fechaInscripcion - b.fechaInscripcion;
        }
      });
  
      setMemberData(updatedData);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo encontrar al socio');
      setMemberData(null);
    }
  };
  

  return (
    <div>
      <h2>Actividades del Socio</h2>
      <div>
        <label>
          DNI:
          <input type="text" value={dni} onChange={(e) => setDNI(e.target.value)} />
        </label>
        <button onClick={handleCheckMember}>Buscar</button>
      </div>
      {error && <p>{error}</p>}
      {memberData && (
  <div>
    <h3>Actividades del Socio:</h3>
    <ul>
      {memberData.actividades.map((activity) => (
        <li key={activity._id}>
          <strong>Actividad:</strong> {activity.nombre} - <strong>Fecha de Inscripción:</strong> {new Date(activity.fechaInscripcion).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default MemberCheck;
