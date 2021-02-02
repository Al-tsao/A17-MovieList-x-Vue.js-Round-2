const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

new Vue({
  el: "#app",
  data: {
    movies: [],
    filteredMovies: [],
    searchMovies: "",
    movieDetail: {},
  },
  methods: {
    handleSearchClicked(event) {
      event.preventDefault()
      const keyword = this.searchMoives.trim().toLowerCase()
      this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(keyword))
    },
    detail(movie) {
      this.movieDetail = movie
      console.log(this.movieDetail)
    }
  },
  created() {
    //用 axios 接入 API 資料
    axios
      .get(INDEX_URL)
      .then((response) => {
        // map() 運算原始資料，回傳新的陣列
        // 這裡在 {} 外加 ()，可以自動 return 物件
        this.movies = response.data.results.map((movie) => ({
          // 展開原本的 movie，再複寫要修改的內容
          ...movie,
          image: POSTER_URL + movie.image
        }));
        console.log(this.movies)
        this.filteredMovies = this.movies.map(item => item);
      })
      .catch((error) => console.log(error));
  }
});
