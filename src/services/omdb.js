import axios from "axios";

export const OMDB_API_KEY = "b11b4b50";
export const BASE_URL = "https://www.omdbapi.com/";

const getMovies = async (title, page = 1) => {
  const target = `${BASE_URL}?apikey=${OMDB_API_KEY}&s=${title}&type=movie&page=${page}`;
  return await axios
    .get(target)
    .then((res) => {
      let total = 0;
      if (res.data.Error) {
        if (res.data.Error === "Too many results.") {
          total = -1;
        }
      }
      total = res.data.totalResults || total;
      const ret = {
        movies: res.data.Search || [],
        total: total,
      };

      return ret;
    })
    .catch((ignore) => {
      return [];
    });
};

const getFullMovie = async (id) => {
  const target = `${BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}`;
  return await axios
    .get(target)
    .then((res) => {
      return res.data ? res.data : null;
    })
    .catch((ignore) => {
      return [];
    });
};

export default {
  getMovies,
  getFullMovie,
};
