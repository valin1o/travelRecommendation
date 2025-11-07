let countriesData = null;

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    countriesData = data.countries;
    console.log('Loaded data:', countriesData);
  })
  .catch(error => console.error('Error fetching recommendations:', error));

function renderResults(results) {
  let oldResults = document.getElementById('results-section');
  if (oldResults) oldResults.remove();

  const resultsSection = document.createElement('div');
  resultsSection.id = 'results-section';

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'recommendation-card';

    const image = document.createElement('img');
    image.src = result.imageUrl || 'default.jpg';
    image.alt = result.name;
    card.appendChild(image);

    const title = document.createElement('h3');
    title.innerText = result.name;
    card.appendChild(title);

    if (result.description) {
      const desc = document.createElement('p');
      desc.innerText = result.description;
      card.appendChild(desc);
    }

    resultsSection.appendChild(card);
  });

  document.body.appendChild(resultsSection);
}

document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('searchButton');
  const clearBtn = document.getElementById('clearButton');
  const searchInput = document.getElementById('searchInput');

  searchBtn.addEventListener('click', function () {
    const query = searchInput.value.trim().toLowerCase();
    let results = [];

    if (countriesData) {
      countriesData.forEach(country => {
        if (
          country.name.toLowerCase().includes(query) ||
          query === 'country'
        ) {
          results.push({ 
            type: 'country',
            name: country.name,
            imageUrl: country.imageUrl,
            description: country.description || ''
          });
        }

        country.cities.forEach(city => {
          if (
            city.name.toLowerCase().includes(query) ||
            city.description.toLowerCase().includes(query) ||
            (query === 'beach' && city.description.toLowerCase().includes('beach')) ||
            (query === 'temple' && city.description.toLowerCase().includes('temple'))
          ) {
            results.push({
              type: 'city',
              name: city.name,
              imageUrl: city.imageUrl,
              description: city.description
            });
          }
        });
      });
    }

    console.log('Search results:', results);

    if (results.length === 0) {
      alert('No recommendations found for your search!');
    } else {
      renderResults(results);
    }
  });

  // Clear button logic
  clearBtn.addEventListener('click', function () {
    searchInput.value = '';
    let resultsSection = document.getElementById('results-section');
    if (resultsSection) resultsSection.remove();
  });
});
