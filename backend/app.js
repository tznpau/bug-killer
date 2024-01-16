const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./sequelize');

const app = express();

// app.use(cors()); // cross-origin requests = spune ca clientii din diferite origini au voie sa faca requests la server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// folosirea fisierelor routes
app.use('/api', routes);


// sincronizarea bd
sequelize.sync().then(() => {
  console.log('Database synced');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});