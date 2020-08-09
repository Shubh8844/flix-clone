const API_KEY = "6440cb9f04210cffe0886d285af3a78f";

/* The end points of URL not complete  complete url below
https://api.themoviedb.org/3/trending/all/week?api_key=6440cb9f04210cffe0886d285af3a78f&language=en-US  -->link1*/

const requests = {
  fetchtrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fecthHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fecthComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fecthRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fecthDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`
};

export default requests;
