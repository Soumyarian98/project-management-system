"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const app_1 = require("./app");
dotenv_1.default.config({ path: node_path_1.default.join(__dirname, "..", ".env") });
const main = () => {
    var _a;
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
    app_1.app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    });
};
main();
