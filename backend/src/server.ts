import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

// Exemple de route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the TypeScript backend with .env!');
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
