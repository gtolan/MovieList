import axios from "axios";
const baseUrl =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=32550221f8c9bddd62cef24aa22975b1&language=en-US&page=1";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

export class MoviesService {
  constructor() {
    this.nowPlayingMovies();
  }

  nowPlayingMovies() {
    return this.fetchData(baseUrl);
  }

  fetchData(url) {
    //fetch data and render
    axios
      .get(url)
      .then(response => {
        let result = response.data.results;
        return result;
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(res => {
        this.renderAsFragment(res);
      });
  }
  addRatingStars(ratingOutOfTen) {
    //create a fragment and return
    //divide the rating by 2 and round up
    let fragment = document.createDocumentFragment();
    let rating = ratingOutOfTen / 2;
    rating = Math.ceil(rating);
    let total = 5;
    let counter = 0;
    //create 5 star elements placing empty stars on top
    while (counter < total) {
      counter++;
      let star = document.createElement("span");
      counter <= rating
        ? star.classList.add("full-star")
        : star.classList.add("empty-star");
      fragment.childElementCount === 0
        ? fragment.appendChild(star)
        : fragment.insertBefore(star, fragment.firstElementChild);
    }
    return fragment;
  }

  createMovieCardItem(item, index) {
    //create each movie card
    let ele = document.createElement("div");
    ele.classList.add("card");
    ele.dataset.dateKey = index;

    let title = document.createElement("p");
    title.innerHTML = item.original_title;
    title.classList.add("title");
    ele.appendChild(title);

    let rating = document.createElement("div");
    rating.classList.add("rating");
    ele.appendChild(rating);

    let stars = this.addRatingStars(item.vote_average);
    rating.appendChild(stars);

    let img = new Image();
    img.src = imageBaseUrl + item.backdrop_path;
    img.classList.add("poster");
    ele.appendChild(img);

    ele.id = item.id;
    ele.dataset.popularity = item.popularity;
    ele.dataset.averageVote = item.vote_average;
    return ele;
  }

  renderAsFragment(result) {
    //render all cards at once in a fragment
    //set the list order type in a data attr
    let fragment = document.createDocumentFragment();
    result.forEach((item, index) => {
      let ele = this.createMovieCardItem(item, index);
      fragment.appendChild(ele);
    });

    let main = document.body.querySelector("main");
    let loader = main.querySelector("img.loader");
    main.removeChild(loader);
    main.appendChild(fragment);
    main.dataset.orderBy = "date";
  }
}
