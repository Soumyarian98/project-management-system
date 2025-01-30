"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const project_routes_1 = require("./routes/project.routes");
const tasks_routes_1 = require("./routes/tasks.routes");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
(0, morgan_body_1.default)(exports.app, {
    logRequestBody: false,
    logResponseBody: false,
    logIP: false,
    logReqUserAgent: false,
    dateTimeFormat: "clf",
});
exports.app.use("/projects", project_routes_1.projectRouter);
exports.app.use("/tasks", tasks_routes_1.tasksRouter);
exports.app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
