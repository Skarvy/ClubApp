import React, { useState } from 'react';

const CreateMember = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDNI] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoUrgencia, setTelefonoUrgencia] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          apellido,
          dni,
          telefono,
          telefonoUrgencia
        })
      });
      if (!response.ok) {
        throw new Error('Error al crear el miembro');
      }
      setMensaje('Miembro creado exitosamente');
      // Limpiar el formulario después de enviar los datos
      setNombre('');
      setApellido('');
      setDNI('');
      setTelefono('');
      setTelefonoUrgencia('');
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al crear el miembro');
    }
  };

  return (
    <div className="container mt-4">
    <h2 className="mb-4">Crear Nuevo Miembro</h2>
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
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          className="form-control"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dni">DNI:</label>
        <input
          type="text"
          id="dni"
          className="form-control"
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          className="form-control"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefonoUrgencia">Teléfono de Urgencia:</label>
        <input
          type="text"
          id="telefonoUrgencia"
          className="form-control"
          value={telefonoUrgencia}
          onChange={(e) => setTelefonoUrgencia(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Crear Miembro</button>
    </form>
    {mensaje && <p className="mt-3">{mensaje}</p>}
  </div>
  );
};

export default CreateMember;
