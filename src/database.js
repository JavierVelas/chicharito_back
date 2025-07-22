// database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || root,
  host: process.env.DB_HOST || dpg-d1s9i6ripnbc73drf52g-a, 
  database: process.env.DB_NAME || chicharitos,
  password: process.env.DB_PASSWORD || fQmBkWWhfs3pyOBxIml15Va8eFUfwvER,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false // Necesario para Render
  }
});