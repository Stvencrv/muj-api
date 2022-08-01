"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, database_1.dbConnections)();
const PORT = app_1.default.get('port') || 4000;
app_1.default.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
