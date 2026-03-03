const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const propertiesRouter = require('./routes/properties');
const authRouter = require('./routes/auth');
const favoritesRouter = require('./routes/favorites');

app.use('/api/properties', propertiesRouter);
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'BoligSilkeborg API kører' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});