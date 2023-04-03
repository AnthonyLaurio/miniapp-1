const express = require('express');
const { getMovies, getSearch, addMovie, deleteMovie } = require('./controllers/controllers.js');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  const movies = await getMovies();
  res.send(movies)
});

app.get('/search/:search', async (req, res) => {
  const { search } = req.params;
  const movies = await getSearch(search);
  res.send(movies)
});

app.post('/insert', async (req, res) => {
  console.log(req.body);
  const { title } = req.body;
  res.send(await addMovie(title));
});

app.delete('/delete/:title', async (req, res) => {
  const { title } = req.params;
  res.send(await deleteMovie(title));
});


app.listen(port, () => {
  console.log(`Up and running on port: ${port}`)
});
