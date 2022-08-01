"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const swaggerUi = require('swagger-ui-express');
console.log(swaggerUi);
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
};
//Middlewares
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('../uploads', express_1.default.static(path_1.default.resolve('uploads')));
// App configs
app.set('port', process.env.PORT);
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/products', product_route_1.default);
app.use('/api/orders', order_route_1.default);
exports.default = app;
