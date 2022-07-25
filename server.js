const express = require('express');
const db = require('./config/connection');
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/users', (req, res) => {
  const newUser = new User({ name: req.params.user });
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('Something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/thoughts', (req, res) => {
  const newThought = new Thought({ name: req.params.thought });
  newThought.save();
  if (newThought) {
    res.status(201).json(newThought);
  } else {
    console.log('Something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.get('/users', (req, res) => {
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

app.get('/thoughts', (req, res) => {
  Thought.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  })
})

app.get('/users/:user_id', (req, res) => {
  User.findOne({ name: 'User' }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

app.get('/thoughts/:thought_id', (req, res) => {
  Thought.findOne({ name: 'Thought' }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

app.delete('/user/:user_id', (req, res) => {
  User.findOneAndDelete(
    { name: req.params.user },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
