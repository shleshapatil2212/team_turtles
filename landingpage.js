function submitSearch() {
    const input = document.getElementById('search-bar');
    const inputValue = input.value.trim();

    if(inputValue !== ''){
        
        // Store the search query in sessionStorage
        sessionStorage.setItem('searchQuery', inputValue);

        // Redirect to the results page
        window.location.href = 'result.html';
    }
    else 
    {
        alert('Please enter a valid search query.');
    }
}
