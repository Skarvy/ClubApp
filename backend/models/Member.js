import mongoose from 'mongoose';

const actividadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    
  },
  descripcion: {
    type: String,
    
  },
  fechaDeInscripcion: {
    type: String, 
    
  },
  fechaDeUltimoPago: {
    type: String, 
    
  }
});

const memberSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  },
  telefonoUrgencia: {
    type: String,
    required: true
  },
  actividades: [actividadSchema],
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
