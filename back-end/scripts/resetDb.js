// scripts/resetDb.js
import pool from '../db/db.js';

const resetDb = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS projects, profiles, users CASCADE;

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );

      CREATE TABLE profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        image_url TEXT,
        job_title TEXT,
        name TEXT,
        bio TEXT
      );

      CREATE TABLE projects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        image_url TEXT,
        project_name TEXT NOT NULL,
        demo_url TEXT,
        repository_url TEXT,
        description TEXT
      );
    `);
    console.log('✅ Database has been reset.');
  } catch (err) {
    console.error('❌ Error resetting database:', err);
  } finally {
    await pool.end();
  }
};

resetDb();
