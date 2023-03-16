"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("colors");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const administratorRoute_1 = __importDefault(require("./routes/administratorRoute"));
const administratorAvaterRoute_1 = __importDefault(require("./routes/administratorAvaterRoute"));
const platformModelRoute_1 = __importDefault(require("./routes/platformModelRoute"));
const topicRoute_1 = __importDefault(require("./routes/topicRoute"));
const appendixRoute_1 = __importDefault(require("./routes/appendixRoute"));
(0, db_1.default)();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/api/administrator", administratorRoute_1.default);
app.use("/api/administratorAvater", administratorAvaterRoute_1.default);
app.use("/api/platformModel", platformModelRoute_1.default);
app.use("/api/topic", topicRoute_1.default);
app.use("/api/appendix", appendixRoute_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`.cyan.underline);
});
