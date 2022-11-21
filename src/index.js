import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/usersRoutes.js';
import extractRoutes from './routes/extractRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(extractRoutes);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));