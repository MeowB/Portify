import express from 'express'
import cors from 'cors'
import pingRouter from './routes/pingPong.js';
import projectsSelectAll from './routes/projects/selectAll.js'
import createNewProject from './routes/projects/createNewProject.js';
import updateProjectById from './routes/projects/updateProjectById.js';
import deleteProjectById from './routes/projects/deleteProjectById.js';
import selectAllProjectByUserId from './routes/projects/selectAllByUserId.js';

const app = express();
app.use(cors())


const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(pingRouter);

app.use('/api/projects', createNewProject)
app.use('/api/projects', deleteProjectById)
app.use('/api/projects', projectsSelectAll)
app.use('/api/projects', selectAllProjectByUserId)
app.use('/api/projects', updateProjectById)

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
