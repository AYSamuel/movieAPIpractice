import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './component/MovieCard';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=a874f9a4';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Axios for fetching data syntax, rather than using fetch. (dont forget to npm install axios and then import it before using this syntax)
  const searchMovies = async (title) => {
    return axios
      .get(`${API_URL}&s=${title}`)
      .then((response) => {
        // handle success
        const data = response.data;
        setMovies(data.Search);
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };

  useEffect(() => {
    searchMovies('');
  }, []);

  return (
    <div className='App'>
      <h1>Saminex Movies</h1>
      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchTerm);
              // Call the API search function with the current searchTerm value
            }
          }}></input>
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}></img>
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>Search your movies</h2>
        </div>
      )}
    </div>
  );
};

export default App;
