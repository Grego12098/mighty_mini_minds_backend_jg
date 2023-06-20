import express from "express";
import usersRoutes from "./routes/usersRoutes.js";
import entryRoutes from "./routes/entryJournalRoutes.js";

const app = express(); // create the app with express

// middleware para que express entienda los json
app.use(express.json());

// middleware to use the routes in the app
app.use(usersRoutes, entryRoutes);
export default app;
