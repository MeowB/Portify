import bcrypt from 'bcrypt';
import pool from '../db/db.js';
import { configDotenv } from 'dotenv';

configDotenv();

const insertDummyData = async () => {
	const secret = process.env.JWT_SECRET

  try {
	const hashedPasswords = await Promise.all([
	  bcrypt.hash('ringbearer123' + secret, 9),
	  bcrypt.hash('king123' + secret, 9),
	  bcrypt.hash('archer123' + secret, 9),
	  bcrypt.hash('youShallNotPass123' + secret, 9)
	]);

    // Insert users
    await pool.query(`
      INSERT INTO users (email, password)
      VALUES 
        ('frodo@shire.com', $1),
        ('aragorn@gondor.com', $2),
        ('legolas@woodland.com', $3),
        ('gandalf@wizard.com', $4);
    `, hashedPasswords);

    // Insert profiles
    await pool.query(`
      INSERT INTO profiles (user_id, image_url, job_title, name, bio)
      VALUES 
        (1, 'https://placehold.co/40', 'Ring Bearer', 'Frodo Baggins', 'A hobbit tasked with destroying the One Ring.'),
        (2, 'https://placehold.co/40', 'King of Gondor', 'Aragorn', 'The rightful heir to the throne of Gondor.'),
        (3, 'https://placehold.co/40', 'Archer', 'Legolas', 'An elf with unmatched archery skills.'),
        (4, 'https://placehold.co/40', 'Wizard', 'Gandalf', 'A wise wizard guiding the Fellowship.');
    `);

    // Insert projects
    await pool.query(`
      INSERT INTO projects (user_id, image_url, project_name, demo_url, repository_url, description)
      VALUES 
        -- Frodo's projects
        (1, 'https://placehold.co/220x140', 'Destroy the One Ring', 'https://demo.ring.com', 'https://github.com/frodo/ring', 'A mission to destroy the One Ring in Mount Doom.'),
        (1, 'https://placehold.co/220x140', 'Hobbiton Cleanup', 'https://demo.hobbiton.com', 'https://github.com/frodo/hobbiton', 'A project to clean up Hobbiton after the journey.'),
        
        -- Aragorn's projects
        (2, 'https://placehold.co/220x140', 'Reclaim Gondor', 'https://demo.gondor.com', 'https://github.com/aragorn/gondor', 'A project to reclaim the throne of Gondor.'),
        (2, 'https://placehold.co/220x140', 'Ranger Training', 'https://demo.ranger.com', 'https://github.com/aragorn/ranger', 'A training program for future rangers of the North.'),
        
        -- Legolas's projects
        (3, 'https://placehold.co/220x140', 'Archery Training', 'https://demo.archery.com', 'https://github.com/legolas/archery', 'A training program for mastering archery.'),
        (3, 'https://placehold.co/220x140', 'Forest Preservation', 'https://demo.forest.com', 'https://github.com/legolas/forest', 'A project to preserve the Woodland Realm.'),
        
        -- Gandalf's projects
        (4, 'https://placehold.co/220x140', 'Guide the Fellowship', 'https://demo.fellowship.com', 'https://github.com/gandalf/fellowship', 'Guiding the Fellowship of the Ring on their quest.'),
        (4, 'https://placehold.co/220x140', 'Fireworks Show', 'https://demo.fireworks.com', 'https://github.com/gandalf/fireworks', 'A project to create a spectacular fireworks display.');
    `);

    console.log('✅ Dummy data inserted');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

insertDummyData();