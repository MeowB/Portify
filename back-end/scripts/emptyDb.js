// scripts/emptyDb.js
import pool from '../db/db.js';

const emptyDb = async () => {
  try {
    await pool.query(`
      DELETE FROM projects;
      DELETE FROM profiles;
      DELETE FROM users;
    `);
    console.log('🧹 All data deleted from the database.');
  } catch (err) {
    console.error('❌ Error emptying database:', err);
  } finally {
    await pool.end();
  }
};

emptyDb();
