export const removeMovie = (movie, list) => {
  return list.filter((m) => m.imdbID !== movie.imdbID);
};
