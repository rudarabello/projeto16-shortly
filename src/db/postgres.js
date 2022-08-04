import pg from "pg";
import dotenv from 'dotenv'; dotenv.config();

const { Pool } = pg;

export const clientPg = new Pool({ connectionString: process.env.DATABASE_URL });