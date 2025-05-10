import express from 'express'
import cors from 'cors'
import pingRouter from './routes/pingPong.js';

import createNewProject from './routes/projects/createNewProject.js';
import readAllProjectByUserId from './routes/projects/readAllByUserId.js';
import updateProjectById from './routes/projects/updateProjectById.js';
import deleteProjectById from './routes/projects/deleteProjectById.js';

import login from './routes/auth/login.js'
import register from './routes/auth/register.js'
import authenticateToken from './middleware/authMiddleware.js'

const app = express();
app.use(cors())


const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(pingRouter);

app.use('/api/projects', authenticateToken, createNewProject)
app.use('/api/projects', authenticateToken, readAllProjectByUserId)
app.use('/api/projects', authenticateToken, updateProjectById)
app.use('/api/projects', authenticateToken, deleteProjectById)

app.use('/api/auth', login)
app.use('/api/auth', register)


app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
