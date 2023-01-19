var id = window.location.search.replace("?name=", "")

// -----------SEARCH--------------------------------

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

// ------------TITTLE-----------------------------------

fetch(`http://api.tvmaze.com/shows/${id}`)
    .then(res => res.json())
    .then(data => {
        document.querySelector('.mainTittle').textContent = data.name;

    })

// ------------IMG-----------------------------------

fetch(`https://api.tvmaze.com/shows/${id}/images`)
.then(res => res.json())
.then(data => {
    let x = document.createElement('img');
    x.src = data[0].resolutions.original.url;
    document.querySelector('.maininfo').prepend(x)
})

// ------------SEASONS+EPISODES---------------------------------
var season;

fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
    .then(res => res.json())
    .then(data => {
        document.querySelector('.seasons>h2').textContent = `Seasons (${data.length})`
        for (let i = 0; i < data.length; i++) {
            let x = document.createElement('li');
            x.innerHTML = `${data[i].premiereDate} - ${data[i].endDate}
            <p class='openEpisodes'>Episodes:</p>`;
            let y = document.createElement('ol');
            x.append(y)
            document.querySelector('.seasons>ul').append(x)
            x.addEventListener('click', () => {
                y.classList.add('seasonslist')
                y.classList.toggle('open')
                episodes()
                season = i + 1
            })

        }
    })

// -----------FUNCTION-EPISODES-----------------------------------

function episodes() {
    document.querySelectorAll('.seasons>ul>li>ol').forEach((e) => e.innerHTML = '');


    fetch(`https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=cast`)
        .then(res => res.json())
        .then(data => data._embedded.episodes)
        .then(data => data.filter(e => e.season === season))
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let x = document.createElement("li")
                x.textContent = `${data[i].name}`
                document.querySelector(`.seasons>ul>li:nth-child(${season})>ol`).append(x)
            }
        })
  
}

// ------------CAST-----------------------------------

fetch(`https://api.tvmaze.com/shows/${id}/cast`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < 7; i++) {
            let x = document.createElement('li');
            x.textContent = data[i].person.name;
            document.querySelector('.cast>ul').append(x)
            x.addEventListener("mouseover", () => {
                x.style.color = "blue";
                x.style.cursor = "pointer";
                let img = document.createElement('img')
                img.src = `${data[i].character.image.original}`
                document.querySelector('.cast').append(img)
            })
            x.addEventListener("mouseout", () => {
                x.style.color = "black"
                const img = document.querySelector('.cast').querySelector('img')
                console.log(img)
            document.querySelector('.cast').removeChild(img)
        })
        }
    })

// ------------SHOW DETAILS-----------------------------------

fetch(`http://api.tvmaze.com/shows/${id}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        document.querySelector('.details>p').innerHTML = data.summary;
    })

// function info(data) {
//     document.querySelector(".popular")
//     data.
// }

// ------------AKA-----------------------------------

// fetch(`https://api.tvmaze.com/shows/${id}/akas`)
//     .then(res => res.json())
//     .then(data => {
//         let x = document.createElement("h2");
//         x.textContent = "AKA";
//         document.querySelector(".maininfo").append(x);
//         for (let i = 0; i < data.length; i++) {
//             let y = document.createElement("p");
//             y.textContent = `${data[i].country?.name} - ${data[i].name}`;
//             // -------------? JE OPTIONAL CHAINING----------------------
//             document.querySelector(".maininfo").append(y);

//         }
//     })
