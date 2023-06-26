import express from "express";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import entryRoutes from "./routes/entryJournalRoutes.js";

const app = express(); // create the app with express

// Enable Cors middleware for frontend access
app.use(cors({
    origin: ['http://localhost:5173', 'https://wonderful-paletas-0c1299.netlify.app'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','token'],
  }));

// middleware para que express entienda los json
app.use(express.json());


// middleware to use the routes in the app
app.use(usersRoutes, entryRoutes);
export default app;
