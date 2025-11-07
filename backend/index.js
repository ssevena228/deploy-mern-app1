const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter.js');
const ProuductRouter = require('./Routes/ProductRouter.js');
require('dotenv').config();
require('./Models/db');


const PORT = process.env.PORT;




app.get('/', (req, res) => {
    res.send("Welcome to the homepage!");
});
app.get('/ping', (req, res) => {
    console.log("PONG");
    res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/product', ProuductRouter);


app.listen(8080, () => {
    console.log(`i am listening   ${PORT}`)
});


// app.get('/',   (req, res) => {
//     res.send("Hello world");
// });

// app.get('/ping', (req, res) => {
//     console.log("PONG");
//     res.send("PONG");
// });

// app.listen(8080, () => {
//     console.log("Server running at http://localhost:8080");
// });