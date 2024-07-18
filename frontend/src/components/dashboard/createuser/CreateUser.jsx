import React, { useState } from 'react';

const CreateUser = ({ onCreate }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDNI] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoUrgencia, setTelefonoUrgencia] = useState('');

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
        throw new Error('Error al crear el usuario');
      }
      const data = await response.json();
      onCreate(data); // Llama a la función onCreate con los datos del nuevo usuario
      // Limpiar el formulario después de enviar los datos
      setNombre('');
      setApellido('');
      setDNI('');
      setTelefono('');
      setTelefonoUrgencia('');
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
          Apellido:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <br />
        <label>
          DNI:
          <input type="text" value={dni} onChange={(e) => setDNI(e.target.value)} />
        </label>
        <br />
        <label>
          Teléfono:
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </label>
        <br />
        <label>
          Teléfono de Urgencia:
          <input type="text" value={telefonoUrgencia} onChange={(e) => setTelefonoUrgencia(e.target.value)} />
        </label>
        <br />
        <br />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
