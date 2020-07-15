const express = require('express');
const DBConnect = require('./config/db');

// create server
const app = express();

// connect to DB
DBConnect();

// enable express.json insted of use body parser
app.use(express.json({ extended: true }));

// app port
const PORT = process.env.PORT || 4000;

// import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// displaying welcome message
app.get('/', (req, res) => {
    res.send({ "message": "Hello from API :)" });
});

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});