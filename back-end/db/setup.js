// setup.js
import pool from './db.js';

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        image_url TEXT,
        job_title TEXT,
        name TEXT,
        bio TEXT
      );

      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        image_url TEXT,
        project_name TEXT NOT NULL,
        demo_url TEXT,
        repository_url TEXT,
        description TEXT
      );
    `);
    console.log('✅ Tables created');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createTables();
