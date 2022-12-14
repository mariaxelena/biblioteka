import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import knjigaRouter from './routers/knjiga.router';
import korisnikRouter from './routers/korisnik.router';
import { dbConnect } from './configs/database.config';
import zaduzenjeRouter from './routers/zaduzenje.router';

dbConnect();

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/knjige", knjigaRouter);
app.use("/api/korisnici", korisnikRouter);
app.use("/api/zaduzenja", zaduzenjeRouter);


const port = 4000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})