"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjects = void 0;
const db_client_1 = __importDefault(require("../database/db-client"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield (0, db_client_1.default) `SELECT * FROM projects;`;
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Error retriving projects." });
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const columns = ["projectName", "description", "startDate", "endDate"];
        const project = yield (0, db_client_1.default) `INSERT INTO projects ${(0, db_client_1.default)(req.body, columns)} RETURNING *;`;
        if (project.length === 0) {
            res.status(500).json({ message: "Failed to create row." });
        }
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create row." });
    }
});
exports.createProject = createProject;
