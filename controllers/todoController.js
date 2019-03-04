var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connecting mlab
mongoose.connect('mongodb://nishudevilnr7:shambhu1903@ds139243.mlab.com:39243/todoapp', { useNewUrlParser: true });

//create a schema for mongoose to recognise todo items
var todoSchema= new mongoose.Schema({
  item: String
});

//model to use Schema
var Todo=mongoose.model('Todo',todoSchema);
/*var item1=  Todo({item:'fuck him'}).save(function(err){
  if (err) throw err;
  console.log('Item Saved');
});*/

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// dummy data : var data=[{item: 'kill the person'},{item: 'commit suicide'}];

module.exports=function(app){

  app.get('/todo',function(req,res){
    //getting from mongodb and showing in the view
    Todo.find({},function(err,data){
      if (err) throw err;
      res.render('todo',{todos: data});

    });

  });

//this handler is fired when the ajax requests for post method handled ny jquery. The data is passed to app.js where it is modified and returned to frontend in ajax
app.post('/todo',urlencodedParser,function(req,res){

  //get from view and add to mongo db
  var newTodo = Todo(req.body).save(function(err,data){
    if (err) throw err;
    res.json({todos: data});
  })

});

app.delete('/todo/:item',function(req,res){

  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if (err) throw err;
    res.json({todos: data});
  });
  /*data= data.filter(function(todo){
    return todo.item.replace(/ /g,'-') !== req.params.item;//when it becomes equal i.e. 0 delete is performed
  });
  res.json({todos: data});
});
*/
});
}
