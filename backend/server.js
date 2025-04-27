import express from 'express';
import sequelize from './config/db.js'; // path to your db.js
import Entry from './models/Entry.js';
import entryRoutes from './routes/entries.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Important to parse JSON bodies

app.use('/api/entries', entryRoutes);

// Connect to database and sync models first
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    await sequelize.sync(); // Sync models to RDS
    console.log('✅ All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})();
