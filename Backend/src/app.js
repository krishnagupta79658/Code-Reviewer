import express from "express"
import cors from 'cors';
import Routes from "./routes/ai.routes.js"

const app=express()
app.use(cors());
app.use(express.json());
app.use("/api",Routes)





export default app