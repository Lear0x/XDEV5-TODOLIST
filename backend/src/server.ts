import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';
import todoItemRoutes from './routes/todoItem.routes';
import todoListRoutes from './routes/todoList.routes';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/todo-items', todoItemRoutes); // Routes pour les TodoItems
app.use('/api/todo-lists', todoListRoutes); // Routes pour les TodoLists

// Exemple de route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the TypeScript backend with .env!');
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
