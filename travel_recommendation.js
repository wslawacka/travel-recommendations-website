const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const main = document.getElementById('main');

function searchForRecommendations() {
    let searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    if (searchInput === 'beach') searchInput = 'beaches';
    else if (searchInput === 'temple') searchInput = 'temples';
    else if (searchInput === 'country') searchInput = 'countries';

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const recommendations = data[searchInput];
        main.innerHTML = `<div id="recommendations"></div>`;
        const recommendationsDiv = document.getElementById('recommendations');
        recommendationsDiv.innerHTML = `<h2>Recommendations for You</h2>`;
        for (const recommendation of recommendations) {
            const recommendationDiv = document.createElement('div');
            const recommendationTitle = document.createElement('h3');
            recommendationTitle.textContent = recommendation.name;
            const recommendationImg = document.createElement('img');
            recommendationImg.setAttribute('src', recommendation.imageUrl);
            recommendationImg.classList.add('recommendationImg');
            const recommendationDescription = document.createElement('p');
            recommendationDescription.textContent = recommendation.description;

            recommendationDiv.appendChild(recommendationImg);
            recommendationDiv.appendChild(recommendationTitle);
            recommendationDiv.appendChild(recommendationDescription);
            recommendationDiv.classList.add('recommendation');
          
            recommendationsDiv.appendChild(recommendationDiv);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}

searchBtn.addEventListener('click', searchForRecommendations);

function clearResults() {
    document.getElementById('searchInput').value = '';
    main.innerHTML = `<h1>Find Your Next Unforgettable Destination</h1>
        <p>Whether you're chasing hidden gems or world-famous sights, we help you discover destinations tailored to your interests, travel style and bucket list. Powered by smart recommendations and real traveler insights — it’s time to wander where you truly belong.</p>
    `;
}

clearBtn.addEventListener('click', clearResults);