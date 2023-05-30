const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionStringURI);

let db;
const dbName = 'socialDb';

client.connect()
    .then(() => {
        console.log('Connected successfully to MongoDB');
        db = client.db(dbName);
        
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Mongo connection error: ', err.message)
    });

app.use(express.json());

// localhost:3001/users
// posts a single user into the db
app.post('/users', (req, res) => {
    db.collection('user').insertOne(
        { username: req.body.username, email: req.body.email, thoughts: req.body.thoughts, friends: req.body.friends }
    )
    .then(results => res.json(results))
    .catch(err => {
        if(err) throw err;
    });
});

// localhost:3001/thoughts
app.post('/thoughts', (req, res) => {
    db.collection('thought').insertOne(
        { thoughtText: req.body.thoughtText, createdAt: req.body.createdAt, username: req.body.username, reactions: req.body.reactions }
    )
    .then(results => res.json(results))
    .catch(err => {
        if(err) throw err;
    });
})

// localhost:3001/users
// gets all the existing users from the db
app.get('/users', (req, res) => {
    db.collection('user')
      .find()
      .toArray()
      .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
  });

// localhost:3001/thoughts/
app.get('/thoughts/', (req, res) => {
    db.collection('thoughts')
    .find()
      .toArray()
      .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
});

// localhost:3001/users
// gets a particular user from the db
app.get('/users/:id', (req, res) => {
    db.collection('user').findOne()
    .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
});

// localhost:3001/thoughts/:id
app.get('/thoughts/:id', (req, res) => {
    db.collection('thoughts').findOne()
    .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
});

// localhost:3001/users/delete
// deletes a specific user
app.delete('/users/delete', (req, res) => {
    const userId = new ObjectId(req.body.id);
    db.collection('user').deleteOne(
        { _id: userId }
    )
    .then(results => {
        console.log(results);
        res.json('User deleted')
    })
    .catch (err => {
        if (err) throw err;
    });
});

// localhost:3001/thoughts/delete
// deletes a specific thought
app.delete('/thoughts/delete', (req, res) => {
    const userId = new ObjectId(req.body.id);
    db.collection('thoughts').deleteOne(
        { _id: userId }
    )
    .then(results => {
        console.log(results);
        res.json('Thought deleted')
    })
    .catch (err => {
        if (err) throw err;
    });
});