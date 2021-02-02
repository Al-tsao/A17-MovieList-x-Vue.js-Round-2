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
    favoriteMovies: [],
    visibility: 'home',
    active: 'active',
    NoMoviesInFavorite: true,
  },
  methods: {
    setVisibility(visibility) {
      this.visibility = visibility;
    },
    handleSearchClicked(event) {
      event.preventDefault()
      if (this.visibility === "favorite") {
        const keyword = this.searchMovies.trim().toLowerCase()
        const moviesLength = this.favoriteMovies.filter(movie => movie.title.toLowerCase().includes(keyword)).length
        if (!moviesLength) {
          console.log("此電影不在最愛清單中")
          this.filteredMovies = [...this.favoriteMovies]
          return alert("此電影不在最愛清單中")
        }
        this.filteredMovies = this.favoriteMovies.filter(movie => movie.title.toLowerCase().includes(keyword))
      } else {
        const keyword = this.searchMovies.trim().toLowerCase()
        const moviesLength = this.movies.filter(movie => movie.title.toLowerCase().includes(keyword)).length
        if (!moviesLength) {
          console.log("此電影不在清單中")
          this.filteredMovies = [...this.movies]
          return alert("此電影不在清單中")
        }
        this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(keyword))

      }
    },
    detail(movie) {
      this.movieDetail = movie
      console.log(this.movieDetail)
    },
    addToFavorite(movie) {
      if (this.favoriteMovies.includes(movie)) {
        return alert("此部電影已經在最愛清單中")
      }
      this.favoriteMovies.push(movie)
    },
    removeFromFavorite(movie) {
      this.favoriteMovies = this.favoriteMovies.filter(favoriteMovie => {
        return favoriteMovie !== movie
      })
      if (this.visibility === 'favorite') {
        this.showFavoriteMovies()
      }
    },
    movieInFavorite(movie) {
      if (this.favoriteMovies.includes(movie)) {
        return true
      }
    },
    showFavoriteMovies() {
      this.filteredMovies = [...this.favoriteMovies]
    },
    showMovies() {
      this.filteredMovies = [...this.movies]
    },
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
        this.filteredMovies = [...this.movies];
      })
      .catch((error) => console.log(error));
  }
});
