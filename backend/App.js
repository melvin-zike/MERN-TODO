const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Todo = require('./models/todo');


const app = express();

app.use(bodyParser.json());

//connect to mongo db
mongoose.connect('mongodb+srv://domot:<password>@cluster0.2wbxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  //cors headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

 //post route
app.post('/api/todo', (req, res, next) => {
   const todo = new Todo({
    _id: req.params.id,
    description: req.body.description,
   
   });
   todo.save().then(
     () => {
     res.status(201).json({
       message: 'Recipe saved successfully'
     });
   }).catch((error) => {
     res.status(400).json({
       error: error
     })
   })
});

//edit route
app.put('/api/todo/:id', (req, res, next) => {
  const todo = new Todo({
    _id: req.params.id,
    description: req.body.description,
    
  });
  Todo.updateOne({_id: req.params.id}, todo).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//delete route
app.delete('/api/todo/:id', (req, res, next) => {
  Todo.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//get route
app.use('/api/todo', (req, res, next) => {
    Todo.find().then(
      (todos) => {
        res.status(200).json(todos);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  
});



module.exports = app;