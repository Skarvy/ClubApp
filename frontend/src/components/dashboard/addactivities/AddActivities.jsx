import React, { useState } from 'react';

const AddActivities = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [mensaje, setMensaje] = useState('');

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleAddHorario = () => {
    setHorarios([...horarios, { dia, horaInicio, horaFin }]);
    // Limpiar los campos de horario después de agregarlos
    setDia('');
    setHoraInicio('');
    setHoraFin('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, descripcion, horarios })
      });
      if (!response.ok) {
        throw new Error('Error al agregar la actividad');
      }
      setMensaje('Actividad agregada exitosamente');
      // Limpiar los campos después de agregar la actividad
      setNombre('');
      setDescripcion('');
      setHorarios([]);
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al agregar la actividad');
    }
  };

  return (
    <div className="container mt-4">
    <h2>Agregar Nueva Actividad</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <h3>Horarios</h3>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="dia">Día:</label>
          <select
            id="dia"
            className="form-control"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
          >
            <option value="">Seleccione un día</option>
            {diasSemana.map((dia, index) => (
              <option key={index} value={dia}>
                {dia}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="horaInicio">Hora de Inicio:</label>
          <input
            type="time"
            id="horaInicio"
            className="form-control"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="horaFin">Hora de Fin:</label>
          <input
            type="time"
            id="horaFin"
            className="form-control"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
          />
        </div>
      </div>
      <button type="button" className="btn btn-secondary mt-2" onClick={handleAddHorario}>
        Agregar Horario
      </button>
      <div className="mt-3">
        {horarios.map((horario, index) => (
          <div key={index} className="alert alert-info">
            <p>
              <strong>Día:</strong> {horario.dia}, <strong>Hora de Inicio:</strong> {horario.horaInicio}, <strong>Hora de Fin:</strong> {horario.horaFin}
            </p>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Agregar Actividad
      </button>
    </form>
    {mensaje && <p className="alert alert-success mt-3">{mensaje}</p>}
  </div>
  );
};

export default AddActivities;
