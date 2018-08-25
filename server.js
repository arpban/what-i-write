const dotenv = require('dotenv')
dotenv.config()
const config = require('./config.js')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors');
var path = require('path');

const PORT = process.env.PORT || 8080

var index = require('./routes/index');


let allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(PORT, () => {
    console.log('app running on port ' + PORT)
})