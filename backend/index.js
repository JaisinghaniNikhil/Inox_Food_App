require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

const App = express();

App.use(cors());
App.use(express.json());

App.get('/', (req, res) => {
  res.json({ status: 'INOX payment server running' });
});

App.use('/api', paymentRoutes);

const PORT = process.env.PORT

App.listen(PORT,() => {
    console.log(`Server Started on PORT: ${PORT}`)
})