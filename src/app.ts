import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './config/database';
import workSessionRoutes from './routes/workSessionRoutes';
import authRoutes from './routes/authRoutes';
import './models/associations';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Altere para a URL do seu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api/work-sessions', workSessionRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

export { app, sequelize };
