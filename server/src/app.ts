import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import { projectRouter } from "./routes/project.routes";
import { tasksRouter } from "./routes/tasks.routes";
import { searchRouter } from "./routes/search.routes";

export const app = express();
app.use(cors());
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
morganBody(app, {
	logRequestBody: false,
	logResponseBody: false,
	logIP: false,
	logReqUserAgent: false,
	dateTimeFormat: "clf",
});

app.use("/test", (req, res) => {
	res.json({message: "hello world"})
})

app.use("/projects", projectRouter);
app.use("/tasks", tasksRouter);
app.use("/search", searchRouter);

app.use((req, res, next) => {
	res.status(404).json({ message: "Route not found" });
});
