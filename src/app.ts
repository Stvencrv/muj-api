import express, { Application } from 'express';
import env from 'dotenv';
import authRoutes from "./routes/auth.route";
import productsRoutes from "./routes/product.route";
import orderRoutes from "./routes/order.route";
import morgan from 'morgan';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import { swaggerDocument } from './config/swaggerDocument';
const swaggerUi = require('swagger-ui-express');

console.log(swaggerUi);
env.config();
const app: Application = express();

const corsOptions: CorsOptions = {
    origin: '*',

}
//Middlewares
app.use(
  '/swagger',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use('../uploads', express.static(path.resolve('uploads')));

// App configs
app.set('port', process.env.PORT);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', orderRoutes);

export default app;