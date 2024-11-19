const express = require('express');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const patientRouter = require('./routes/patientRouter');
const app = express();
app.use(express.json());
// const pool = require('./DB');
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');


app.use(writeToLogger);
app.use('/patient',patientRouter);




function writeToLogger(req, res, next){
    const filePath = 'logger.txt';
    const data =`Id: URL: ${req.url}\n`;
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file:', 'error');
        } else {
            console.log('Data has been written to the file successfully.');
        }
    });
    next();
}


app.use('*', (req, res)=>{
    fs.readFile('exeption.html', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
})

app.listen(5000, ()=>{
    console.log('app is listening on port 5000')
})