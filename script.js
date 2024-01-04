if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    const news = await fetchNewsBasedOnLocation(latitude, longitude);
    displayNews(news);
  }, error => {
    console.error("Error getting location: ", error);
    displayDefaultNews(); // Fallback news display
  });
} else {
  console.log("Geolocation is not available");
  displayDefaultNews();
}

async function fetchNewsBasedOnLocation(latitude, longitude) {
  // Replace with your news API endpoint and add location filtering
  try {
      const response = await fetch(`https://example-news-api.com/news?lat=${latitude}&lon=${longitude}`);
      const newsData = await response.json();
      return newsData.articles; // Adjust depending on the API response structure
  } catch (error) {
      console.error('Error fetching news:', error);
      return [];
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-articles');
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const div = document.createElement('div');
    div.className = 'news-item';
    div.innerHTML = `<h3>${article.title}</h3><p>${article.description}</p>`;
    newsContainer.appendChild(div);
  });
}

function displayDefaultNews() {
  // Code to display default news
}
