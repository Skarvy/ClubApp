import Member from '../models/Member.js';

// Controlador para crear un nuevo miembro
export const createMember = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todos los miembros
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un miembro por su ID
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un miembro por su ID
export const updateMember = async (req, res) => {
  try {
    const { actividades, ...resto } = req.body;
    console.log('Actividades recibidas:', actividades); // Verificar las actividades recibidas en el cuerpo de la solicitud
    console.log('Resto del cuerpo:', resto); // Verificar el resto del cuerpo de la solicitud
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { ...resto },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    console.log('Miembro actualizado:', updatedMember);
    res.status(200).json(updatedMember);
  } catch (error) {
    console.error('Error al actualizar el miembro:', error);
    res.status(500).json({ message: error.message });
  }
};


// Controlador para eliminar un miembro por su ID
export const deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    res.status(200).json({ message: 'Miembro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para buscar un miembro por su DNI
export const getMemberByDNI = async (req, res) => {
  try {
    const member = await Member.findOne({ dni: req.params.dni });
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para agregar una actividad a un miembro por su ID
export const addActivityToMember = async (req, res) => {
  try {
    const { nombre, fechaDeInscripcion } = req.body;
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }
    // Agregar la nueva actividad al miembro
    member.actividades.push({ nombre, fechaDeInscripcion });
    await member.save();
    res.status(200).json({ message: 'Actividad agregada al miembro exitosamente' });
  } catch (error) {
    console.error('Error al agregar actividad al miembro:', error);
    res.status(500).json({ message: 'Error al agregar actividad al miembro' });
  }
};
