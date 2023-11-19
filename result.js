document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the search query from sessionStorage
    const searchQuery = sessionStorage.getItem('searchQuery');

    if (searchQuery) {
        // Display the search query (optional)
        document.getElementById('search-results').innerHTML = `<h2>Search Results for "${searchQuery}":</h2>`;

        // Fetch and display search results
        fetchMovieData(searchQuery);
    } else {
        // Redirect back to the 1st page if no search query is found
        window.location.href = 'landingpage.html';
    }
});

async function fetchMovieData(query) {
    const searchResults = document.getElementById('search-results');
    let page = 1;

    const url = `https://ott-details.p.rapidapi.com/search?title=${query}&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '00b294489amsh4bd0730536d9d7fp136d8djsn4bef4e0ae0ba',
            'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parse the JSON response

        if (data.results && data.results.length > 0) {
            // Sort results to display ones with images first
            const sortedResults = data.results.sort((a, b) => (b.imageurl ? 1 : -1));

            // Display the sorted results
            sortedResults.forEach(result => displayResult(result));
        } else {
            console.log("No results found or response format is different.");
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResult(result) {
    const searchResults = document.getElementById('search-results');
    const resultDiv = document.createElement("div");
    resultDiv.className = "search-result";

    const imageUrl = result.imageurl || 'sorry.jfif';
    // Create and append elements for each piece of information
    resultDiv.innerHTML = `
    <p><h2>Title: ${result.title}</h2></p>
    <img src="${imageUrl}" alt="Movie Poster">
        <p>Genre: ${result.genre.join(', ')}</p>
        <p>IMDb ID: ${result.imdbid}</p>
        
        <p>Released: ${result.released}</p>
        <p>Type: ${result.type}</p>
        <p>Synopsis: ${result.synopsis}</p>
    `;

    // Append the resultDiv to the searchResults div
    searchResults.appendChild(resultDiv);
}
