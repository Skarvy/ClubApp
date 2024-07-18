import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB.js';
import activityRoutes from './routes/activityRoutes.js';
import memberRoutes from "./routes/memberRoutes.js"


const app = express();
dotenv.config();
const PORT = process.env.PORT;
connectToMongoDB();
app.use(cors());

app.use(express.json());
app.use('/api', memberRoutes);
app.use('/api', activityRoutes);

app.listen(PORT, () => console.log(`La aplicación está corriendo en http://localhost:${PORT}`));
