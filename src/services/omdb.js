import axios from "axios";

export const OMDB_API_KEY = "b11b4b50";
export const BASE_URL = "http://www.omdbapi.com/";

const getMovies = async (title) => {
  const target = `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${title}&type=movie`;
  return await axios
    .get(target)
    .then((res) => {
      const ret = {
        movies: res.data.Search || [],
        total: res.data.totalResults || 0,
      };
      return ret;
    })
    .catch((err) => {
      return [];
    });
};

export default {
  getMovies,
};
