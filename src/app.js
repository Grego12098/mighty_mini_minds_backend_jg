import express from "express";
import usersRoutes from "./routes/usersRoutes.js";


const app = express();

// middleware
app.use(express.json());

app.use(usersRoutes);
export default app;
