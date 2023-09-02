const patch = require('path');
const express = require('express');
const app = express();
// Optional Port for listening call
const PORT = 3000;
const sqlActions = require('./sqlActions/sqlActions');
sqlActions.createTables();
//import routers
const apiRouter = require('./routers/apiRouter');

// Parse requests
app.use(express.json());

// Handle static assests - not sure where exactly we are requesting static files at this point
// defaulting - /assets
app.use('/assets', express.static('client/assets'));
app.get('/dist', express.static('../dist'));

// create routes for basic CRUD for getting/updating DATA
// create route for logging in

// homepage:
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '/index.html'));
});
// Go to routers for all other requests
app.use('/api', apiRouter);

// default unknown route
app.use((req, res) => res.status(404).send('ERROR: Could not find page!'));

//default error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = ({}, defaultError, err);
  // report to server what error occured
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

// Listening to server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;
