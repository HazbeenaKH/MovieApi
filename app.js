// Improved Movie Search with Dark Mode & Loading Spinner
let searchBtn = document.getElementById('btn');
let toggleThemeBtn = document.getElementById('toggleTheme');
let secondSection = document.getElementById('secondSection');
let loader = document.getElementById('loader');
let body = document.body;

const fetchMovie = async () => {
    let searchQuery = document.getElementById('inputText').value;
    let apiKey = `759246b`;
    let apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&type=movie`;
    
    loader.style.display = "block";
    secondSection.innerHTML = "";
    
    try {
        let fetchApi = await fetch(apiUrl);
        let finalData = await fetchApi.json();
        let lastFinalData = finalData.Search;
        loader.style.display = "none";

        if (lastFinalData) {
            lastFinalData.forEach(element => {
                secondSection.innerHTML += `
                    <div id="displayContainer">
                        <img src="${element.Poster}" alt="${element.Title}">
                        <h3>${element.Title}</h3>
                        <h4>${element.Type}</h4>
                        <h5>Released in ${element.Year}</h5>
                    </div>`;
            });
        } else {
            secondSection.innerHTML = "<h2>No results found. Try another title.</h2>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        secondSection.innerHTML = "<h2>Something went wrong. Please try again.</h2>";
        loader.style.display = "none";
    }
};

const toggleDarkMode = () => {
    body.classList.toggle('dark-mode');
};

searchBtn.addEventListener('click', fetchMovie);
toggleThemeBtn.addEventListener('click', toggleDarkMode);
