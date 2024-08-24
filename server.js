const express = require ('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const app = express();

var students = [
    {
        'name':'Buan, Enrico',
        'studno':'12345',
    },
    {
        'name':'John, Pork',
        'studno':'24680',
    },

];

app.get('/', (req,res) => {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(JSON.stringify(students));
    res.end();

});

app.get('/student', (req,res) => {
    var studId = req.query.id;
    var studIndex = -1;
    for(var i=0; i<students.length; i++) {
        if (studId == students[i].studno) {
            studIndex = i;
            break;
        }
    }
    if(studIndex != -1) {
        res.writeHead(200, {'Content-Type':'application/json'});
        res.write(JSON.stringify(students[studIndex]));
        res.end();
    }
    else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write("<html><body><h1>Student not found</h1></body></html>");
        res.end();

    }   
    

});

app.get('/add', (req,res) => {
    res.sendFile(__dirname + "/" + "form.html");

});

var urlencodedparser = bodyParser.urlencoded({extended: false});

app.post('/create', urlencodedparser, (req,res) => {
    var student = {
        'name':req.body.name,
        'studno':req.body.studno
    }
    students.push(student);
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write("<html><body><h1>Student not found</h1></body></html>");
    res.end();

});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});
