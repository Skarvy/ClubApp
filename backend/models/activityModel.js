import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  nombre: {
    type: String,
 
  },
  descripcion: {
    type: String,
    
  },
  horarios: [
    {
      dia: {
        type: String,
        
      },
      horaInicio: {
        type: String,
        
      },
      horaFin: {
        type: String,
        
      }
    }
  ]
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
