let dropdown = document.querySelector(".dropdown-content");
let dateBtn = dropdown.querySelector(".date");
let popularBtn = dropdown.querySelector(".popularity");
let votesBtn = dropdown.querySelector(".votes");
let main = document.querySelector("main");
let smallCards = document.querySelector("button.small.grid-size");
let mediumCards = document.querySelector("button.medium.grid-size");
let largeCards = document.querySelector("button.large.grid-size");

export const shell = {
  addButtonEvents() {
    dateBtn.addEventListener("click", shell.filterByDate);
    popularBtn.addEventListener("click", shell.filterByPopularity);
    votesBtn.addEventListener("click", shell.filterByVotes);
    largeCards.addEventListener("click", shell.grid.largeCardSize);
    mediumCards.addEventListener("click", shell.grid.mediumCardSize);
    smallCards.addEventListener("click", shell.grid.smallCardSize);
  },
  grid: {
    removeActiveLayoutButton() {
      let large = document.querySelector("button.large.grid-size");
      let medium = document.querySelector("button.medium.grid-size");
      let small = document.querySelector("button.small.grid-size");
      let arrEle = [large, medium, small];
      Array.from(arrEle).forEach(el => {
        el.classList.remove("active");
      });
    },
    largeCardSize() {
      shell.grid.removeActiveLayoutButton();
      document.querySelector("button.large.grid-size").classList.add("active");
      main.classList.remove("medium");
      main.classList.add("large");
    },
    mediumCardSize() {
      shell.grid.removeActiveLayoutButton();
      document.querySelector("button.medium.grid-size").classList.add("active");
      main.classList.remove("large");
      main.classList.add("medium");
    },
    smallCardSize() {
      shell.grid.removeActiveLayoutButton();
      document.querySelector("button.small.grid-size").classList.add("active");
      main.classList.remove("large", "medium");
    }
  },

  removeActive() {
    let arrEle = [dateBtn, popularBtn, votesBtn];
    Array.from(arrEle).forEach(el => {
      el.classList.remove("active");
    });
  },

  sortByAverageVote(a, b) {
    return a.dataset.averageVote > b.dataset.averageVote
      ? 1
      : b.dataset.averageVote > a.dataset.averageVote
      ? -1
      : 0;
  },
  sortByPopularity(a, b) {
    return a.dataset.popularity - b.dataset.popularity;
  },
  sortByDate(a, b) {
    return a.dataset.dateKey - b.dataset.dateKey;
  },
  reverseCardsOrder(order) {
    let cards = main.querySelectorAll(".card");
    let rev = Array.from(cards).reverse();
    shell.reOrderCards(rev, order);
  },
  filterByPopularity() {
    let order = "popularity";
    main.dataset.orderBy === order
      ? shell.reverseCardsOrder(order)
      : shell.popularityFilter(order);
  },
  filterByVotes() {
    let order = "votes";
    main.dataset.orderBy === order
      ? shell.reverseCardsOrder(order)
      : shell.votesFilter(order);
  },
  filterByDate() {
    let order = "date";
    main.dataset.orderBy === order
      ? shell.reverseCardsOrder(order)
      : shell.dateFilter(order);
  },
  popularityFilter(order) {
    shell.removeActive();
    popularBtn.classList.add("active");
    let cards = main.querySelectorAll(".card");
    let sorted = Array.from(cards).sort(shell.sortByPopularity);
    sorted = sorted.reverse();
    shell.reOrderCards(sorted, order);
  },

  votesFilter(order) {
    shell.removeActive();
    votesBtn.classList.add("active");
    let cards = main.querySelectorAll(".card");
    let sorted = Array.from(cards).sort(shell.sortByAverageVote);
    sorted = sorted.reverse();
    shell.reOrderCards(sorted, order);
  },

  dateFilter(order) {
    shell.removeActive();
    dateBtn.classList.add("active");
    let cards = main.querySelectorAll(".card");
    let sorted = Array.from(cards).sort(shell.sortByDate);
    shell.reOrderCards(sorted, order);
  },
  reOrderCards(elems, orderAttr) {
    let fragment = document.createDocumentFragment();
    elems.forEach(it => {
      fragment.appendChild(it);
    });
    main.innerHTML = "";
    main.appendChild(fragment);
    main.dataset.orderBy = orderAttr;
  }
};
