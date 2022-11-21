import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/usersRoutes.js';
import extractRoutes from './routes/extractRoutes.js'

const app = express();
app.use(express.json());
app.use(usersRoutes);
app.use(extractRoutes);

app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));