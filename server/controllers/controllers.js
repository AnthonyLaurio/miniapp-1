const knex = require('./dbconnection.js');

const getMovies = () => {
  return knex('movies').select('*');
}

const getMovie = (movie) => {
  const data = knex('movies').whereILike('title', `${movie}`).select('*');
  return data;
}

const getSearch = (search) => {
  return knex('movies').whereILike('title', `%${search}%`).select('*');
}

const addMovie = async (title) => {
  const movie = await getMovie(title);
  if (movie.length > 0) {
    return { message: 'Movie already exists' };
  } else {
    await knex('movies').insert({ title: `${title}` });

    return { message: 'Movie added' };
  }

}

const deleteMovie = async (title) => {
  const movie = await getMovie(title);
  if (movie.length > 0) {
    await knex('movies').where('title', `${title}`).del();
    return { message: 'Movie deleted' };
  } else {
    return { message: 'Movie does not exist' };
  }
}

const watchedMovie = async (title) => {
  const movie = await getMovie(title);
  if (movie.length > 0) {
    if (movie.watched === true) {
      await knex('movies').where('title', `${title}`).update({ watched: false });
      return { message: 'Movie unwatched' };
    } else {
      await knex('movies').where('title', `${title}`).update({ watched: true });
      return { message: 'Movie watched' };
    }
  } else {
    return { message: 'Movie does not exist' };
  }
}


module.exports = { getMovies, getSearch, addMovie, deleteMovie , watchedMovie};