const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`;

const IMGPATH = 'https://image.tmdb.org/t/p/w1280/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('query');

const searchURL = `https://api.themoviedb.org/3/search/movie?&api_key=${APIKEY}&query=`;

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}

function showMovies(movies) {

    main.innerHTML = '';

    movies.forEach((movie) => {

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        // poster_path
        movieEl.innerHTML = `
            <img src="${IMGPATH + movie.backdrop_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getMovieByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview: ${movie.title}</h4>
                ${movie.overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getMovieByRate(vote) {
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'yellow';
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchValue = search.value;

    if(searchValue){
        getMovies(searchURL + searchValue);
        search.value = '';
    }
});