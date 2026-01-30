const movieInput = document.getElementById("movie-input");
const addMovieBtn = document.getElementById("add-movie-btn");
const watchlist = document.getElementById("watchlist");

async function getMovie(movieName) {
    const urlResponse = await fetch("http://www.omdbapi.com/?t=" + movieName + "&apikey=e7e12da0");
    const urlData = await urlResponse.json(); 
    
    console.log(urlData);
    return urlData; 
}
getMovie("wish");
let myWatchlist = [];
addMovieBtn.addEventListener("click", async () => {
    const movieName = movieInput.value;
    if (movieName){
        const movieData = await getMovie(movieName);       
    
        if (movieData.Response === "True"){
            myWatchlist.push(movieData);
            renderWatchlist();
            
        }else{
            alert("movie not found");
        }
     }
});

function renderWatchlist(){
    const html = myWatchlist.map(movie =>{
        return `<li><img src="${movie.Poster}"> <strong>${movie.Title}</strong> (${movie.Year}) ${movie.Rated}</li>`
    }).join("");
    watchlist.innerHTML = html;
}

renderWatchlist();
