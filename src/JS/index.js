import '../sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
import coupleResultsTpl from '../templates/coupleResults.hbs';
import singleResultTpl from '../templates/singleResult.hbs';
const debounce = require('lodash.debounce');
const { error } = require('@pnotify/core');

const resultsDiv = document.querySelector('.results');
const searchQuery = document.querySelector('#searchQuery');

searchQuery.addEventListener('input', debounce(onFormInput, 500));

function onFormInput(e) {
  e.preventDefault();
  const queryText = searchQuery.value.trimStart();
  if (queryText) {
    searchQuery.value = capitilizer(queryText);
  }
  resultsDiv.innerHTML = '';
  if (queryText) {
    fetchCountries(queryText)
      .then(countries => {
        if (countries.length > 1 && countries.length <= 10) {
          resultsDiv.innerHTML = coupleResultsTpl(countries);
          return;
        } else if (countries.length > 10) {
          error({
            title: 'Whoops...',
            text: 'Too many matches found. Please enter a more specific query',
          });
          return;
        }
        resultsDiv.innerHTML = singleResultTpl(countries[0]);
      })
      .catch(e =>
        error({
          title: 'Sorry!',
          text: `We didnt find country named "${queryText}"`,
        }),
      );
  }
}

function capitilizer(searchQuery) {
  if (searchQuery) {
    return searchQuery
      .split(' ')
      .map(ch => ch.replace(ch.charAt(0), ch.charAt(0).toUpperCase()))
      .join(' ');
  }
}
