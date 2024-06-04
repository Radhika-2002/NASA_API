// Fetches the data for the current date from the NASA API
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiKey = "VZzDwDR5QIBQasqRb1Iw8sRwCj8cXbrDPBzCUYDb";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Display the image of the day in the "current-image-container"
        document.getElementById("current-image-container").innerHTML = `
          <img src="${data.url}" alt="${data.title}">
          <h2>${data.title}</h2>
          <p>${data.explanation}</p>
        `;
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  
  // Fetches the data for the selected date from the NASA API
  function getImageOfTheDay() {
    const date = document.getElementById("search-input").value;
    const apiKey = "VZzDwDR5QIBQasqRb1Iw8sRwCj8cXbrDPBzCUYDb";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Display the image of the day in the "current-image-container"
        document.getElementById("current-image-container").innerHTML = `
          <img src="${data.url}" alt="${data.title}">
          <h2>${data.title}</h2>
          <p>${data.explanation}</p>
        `;
  
        // Save the date to local storage
        saveSearch(date);
  
        // Show the selected date in the search history unordered list
        addSearchToHistory(date);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  
  // Saves the selected date to local storage
  function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
  
  // Retrieves the saved search dates from local storage
  // Displays the search history as an unordered list in the UI
  function addSearchToHistory(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    const searchHistory = document.getElementById("search-history");
    searchHistory.innerHTML = "";
  
    searches.forEach(search => {
      const listItem = document.createElement("li");
      listItem.textContent = search;
      listItem.addEventListener("click", () => {
        // Fetch the data for the selected date again and display it in the "current-image-container"
        getImageOfTheDay(search);
      });
      searchHistory.appendChild(listItem);
    });
  }
  
  // Event listener for form submission
  document.getElementById("search-form").addEventListener("submit", event => {
    event.preventDefault();
    getImageOfTheDay();
  });
  
  // Run the getCurrentImageOfTheDay function when the page loads
  window.addEventListener('load', getCurrentImageOfTheDay);