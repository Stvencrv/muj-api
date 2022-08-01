import { dbConnections } from "./config/database";
import app from './app';
import env from 'dotenv';

env.config();
dbConnections();

const PORT = app.get('port') || 4000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

