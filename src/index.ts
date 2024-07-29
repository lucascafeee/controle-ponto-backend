import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import workSessionRoutes from './routes/workSessionRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/work-sessions', workSessionRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
