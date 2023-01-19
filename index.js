// --------------SEARCH---------------------
let search = document.querySelector("input");
let searchResult = document.createElement("div");
searchResult.className = "searchResult";
search.addEventListener("keyup", () => {
  let x = search.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${x}`)
    .then((res) => res.json())
    .then((data) => {
      searchResult.innerHTML = "";
      // ^^^z
      for (let i = 0; i < 10; i++) {
        let searchItem = document.createElement("a");
        searchItem.href = "showinfo.html" + "?name=" + data[i].show.id;
        searchItem.target = "_blank";
        searchItem.textContent = `${data[i].show.name}`;
        searchResult.append(searchItem);

        searchItem.addEventListener("mouseover", () => {
          searchItem.style.backgroundColor = "grey";
        });

        searchItem.addEventListener("mouseout", () => {
          searchItem.style.backgroundColor = "#F5F5F5";
        });
      }
      document.querySelector(".search").append(searchResult);
    });
});
// ---------------------MAIN CONTETNT----------------------

window.addEventListener("load", () => {
  fetch("http://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((res) => res.sort((a, b) => b.rating.average - a.rating.average))
    .then((res) => res.slice(0, 12))
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        const movie = document.createElement("a");
        const image = document.createElement("img");
        const name = document.createElement("p");
        movie.className = "movie";
        movie.href = "showinfo.html" + "?name=" + res[i].id;
        movie.target = "_blank";
        image.src = res[i].image.medium;
        name.textContent = res[i].name;
        movie.append(image);
        movie.append(name);
        document.querySelector(".main").append(movie);

        movie.addEventListener("mouseover", () => {
          movie.style.border = "5px solid #343A40";
        });

        movie.addEventListener("mouseout", () => {
          movie.style.border = "5px solid white";
        });
      }
    });
});

