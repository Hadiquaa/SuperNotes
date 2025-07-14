import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import router from './routes/notesRoutes.js';
dotenv.config();

const port = process.env.PORT || 8004;

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);


app.use('/api/notes', router);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})