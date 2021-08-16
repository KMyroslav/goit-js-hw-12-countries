export default fetchCountries;

function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(r => r.json())
    .then(([...country]) => country);
}
