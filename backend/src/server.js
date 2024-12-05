const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());  

mongoose.connect('mongodb://localhost:27017/filmLibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


const filmSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number
});

const Film = mongoose.model('Film', filmSchema);

app.post('/api/films', (req, res) => {
  const { title, director, year } = req.body;


  if (!title || !director || !year) {
    return res.status(400).json({ error: 'Missing required fields' });
  }


  const newFilm = new Film({ title, director, year });

  newFilm.save()
    .then(film => {
      console.log('Film added:', film);  
      res.status(201).json(film);  
    })
    .catch(err => {
      console.error('Error adding film:', err);  
      res.status(500).json({ error: 'Failed to add film', message: err.message });
    });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
