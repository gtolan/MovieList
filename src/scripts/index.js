import { MoviesService } from "./fetchData";
import { shell } from "./shell";

document.addEventListener("DOMContentLoaded", function() {
  new MoviesService(); //init the Movie class and remove loader
  shell.addButtonEvents(); //add events to buttons
});
