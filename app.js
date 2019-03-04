var express = require('express');

var todoController=require('./controllers/todoController');
var app=express();

//template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controllers i.e. app can be used to handle request in the controller section
todoController(app);

app.listen(5000);
console.log('Server running at port 5000...');
