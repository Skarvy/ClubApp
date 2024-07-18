import React, { useState } from 'react';

const ClubAccess = () => {
  const [dni, setDNI] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleCheckAccess = async () => {
    try {
      console.log('Buscando información del socio...');
      // Obtener la información del socio
      const userResponse = await fetch(`http://localhost:5000/api/dni/${dni}`);
      if (!userResponse.ok) {
        throw new Error('No se pudo obtener la información del socio');
      }
      const userData = await userResponse.json();
      setUserData(userData);
      setError(null);

      console.log('Datos del socio obtenidos:', userData);

      // Verificar el acceso del socio
      checkAccess(userData);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudo obtener la información del socio');
      setUserData(null);
    }
  };

  const checkAccess = (userData) => {
    console.log('Verificando acceso del socio...', userData);
    let message = '';

    if (!userData || !userData.actividades || userData.actividades.length === 0) {
      message = 'El socio no tiene actividades inscritas. No puede acceder.';
    } else {
      // Filtrar las actividades únicas y encontrar la más reciente por nombre
      const uniqueActivities = {};
      userData.actividades.forEach(activity => {
        if (!uniqueActivities[activity.nombre] || new Date(activity.fechaDeInscripcion) > new Date(uniqueActivities[activity.nombre].fechaDeInscripcion)) {
          uniqueActivities[activity.nombre] = activity;
        }
      });

      // Verificar si ha pasado más de un mes desde la última inscripción
      const currentDate = new Date();
      const oneMonthAgo = new Date().setMonth(currentDate.getMonth() - 1);

      const lastInscription = Object.values(uniqueActivities).reduce((latest, activity) => {
        return new Date(activity.fechaDeInscripcion) > new Date(latest.fechaDeInscripcion) ? activity : latest;
      });

      if (new Date(lastInscription.fechaDeInscripcion) < oneMonthAgo) {
        message = `Ha pasado más de un mes desde la última inscripción. Por favor, renueve su membresía.`;
      } else {
        // Listar todas las actividades del usuario con fecha de inscripción y fecha de vencimiento
        const activitiesList = Object.values(uniqueActivities).map(activity => {
          const fechaInscripcion = new Date(activity.fechaDeInscripcion).toLocaleDateString();
          const fechaVencimiento = new Date(new Date(activity.fechaDeInscripcion).setMonth(new Date(activity.fechaDeInscripcion).getMonth() + 1)).toLocaleDateString();
          return `- ${activity.nombre} (Inscrito el ${fechaInscripcion}, Vence el ${fechaVencimiento})`;
        }).join('\n');

        message = `¡Bienvenido/a ${userData.nombre} ${userData.apellido}! Sus actividades inscritas son:\n${activitiesList}`;
      }
    }

    setMessage(message);
  };

  return (
    <div className="container mt-4">
    <h2>Verificar Acceso al Club</h2>
    <div className="form-group">
      <label htmlFor="dni">DNI:</label>
      <input
        type="text"
        id="dni"
        className="form-control"
        value={dni}
        onChange={(e) => setDNI(e.target.value)}
      />
    </div>
    <button className="btn btn-primary" onClick={handleCheckAccess}>Verificar</button>
    {error && <p className="text-danger mt-2">{error}</p>}
    {message && <p className="mt-2">{message}</p>}
  </div>
  );
};

export default ClubAccess;
