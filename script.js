const movieInput = document.getElementById("movie-input");
const addMovieBtn = document.getElementById("add-movie-btn");
const watchlist = document.getElementById("watchlist");
const resetBtn = document.getElementById("reset-btn");

async function getMovie(movieName) {
    const urlResponse = await fetch("http://www.omdbapi.com/?t=" + movieName + "&apikey=e7e12da0");
    const urlData = await urlResponse.json(); 
    
    return urlData; 
}

let myWatchlist = JSON.parse(localStorage.getItem("movies")) || [];
addMovieBtn.addEventListener("click", async () => {
    const movieName = movieInput.value.trim();
    if (movieName){
        const movieData = await getMovie(movieName);       
    
        if (movieData.Response === "True"){
            myWatchlist.push(movieData);
            localStorage.setItem("movies", JSON.stringify(myWatchlist));
            renderWatchlist();
            movieInput.value = "";
            
        }else{
            alert("movie not found");
        }
     }
});

function renderWatchlist(){
    const html = myWatchlist.map(movie =>{
        return `<div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="desc">
                <strong>${movie.Title}</strong>
                <small>(${movie.Year}) ${movie.Rated}</small>
                
                
            </div>
            </div>`
    }).join("");
    watchlist.innerHTML = html;
}

renderWatchlist();

resetBtn.addEventListener("click", ()=>{
    myWatchlist = [];
    localStorage.removeItem("movies");
    renderWatchlist();
})
