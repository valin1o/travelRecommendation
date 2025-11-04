fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    if (Array.isArray(data.countries)) {
      data.countries.forEach(country => {
        country.cities.forEach(city => {
          console.log(city.name, city.imageUrl, city.description);
        });
      });
    } else {
      console.error("No 'countries' array found in the JSON");
    }
  })
  .catch(error => console.error('Error fetching recommendations:', error));


  let countriesData = null;

  let countriesData = null;

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      countriesData = data.countries;
    });
  
  window.onload = function() {
    document.getElementById('searchButton').addEventListener('click', function() {
      console.log('Button clicked');
      console.log('countriesData:', countriesData);
  
      const query = document.getElementById('searchInput').value.trim().toLowerCase();
      console.log('query:', query);
  
      let results = [];
      if (countriesData) {
        countriesData.forEach(country => {
          if (country.name.toLowerCase().includes(query)) {
            results.push({ type: 'country', name: country.name });
          }
          country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(query) ||
                city.description.toLowerCase().includes(query)) {
              results.push({
                type: 'city',
                name: city.name,
                description: city.description,
                imageUrl: city.imageUrl
              });
            }
          });
        });
      }
      console.log(results);  // Check output here
    });
  };
