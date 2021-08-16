import '../sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
import coupleResultsTpl from '../templates/coupleResults.hbs';
import singleResultTpl from '../templates/singleResult.hbs';
const debounce = require('lodash.debounce');
const { alert, notice, info, success, error } = require('@pnotify/core');

const resultsDiv = document.querySelector('.results');
const searchQuery = document.querySelector('#searchQuery');

searchQuery.addEventListener('input', debounce(onFormInput, 500));

function onFormInput(e) {
  e.preventDefault();
  resultsDiv.innerHTML = '';
  if (searchQuery.value && !searchQuery.value.includes(' ', 0)) {
    fetchCountries(searchQuery.value).then(countries => {
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
    });
  }
}
