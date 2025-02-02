import express from "express";
import cors from "cors";
import { redisClient } from "./utils/redis.js";

const app = express();

app.use(cors());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

redisClient.connect();  

import questionRoutes from "./routes/faq.route.js";

app.use("/api/faq", questionRoutes);

export {app}