import express from "express";
import usersRoutes from "./routes/usersRoutes.js";


const app = express(); // create the app with express

// middleware para que express entienda los json
app.use(express.json());

app.use(usersRoutes); // middleware to use the routes in the app
export default app;
