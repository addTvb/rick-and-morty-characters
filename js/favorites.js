'use strict';

let wrapper = document.querySelector('#wrapper');

const BASE_URL = 'https://rickandmortyapi.com/api/character/';
let favorites = localStorage.getItem('favoriteCharacters');
let parsedFavorites = JSON.parse(favorites);
let filteredArray = [...new Set(parsedFavorites)];

// const getParsedData = (localStorageKey) => {
//     let stringifyData = localStorage.getItem(localStorageKey)
//     return JSON.parse(stringifyData)
//  }
//  let parsed = getParsedData('favoriteCharacters')

const createCard = (character) => {
	let characterWrapper = document.createElement('div');

	let characterImg = document.createElement('img');
	characterImg.src = character.image;

	let characterName = document.createElement('h1');
	characterName.textContent = character.name;

	characterWrapper.appendChild(characterImg);
	characterWrapper.appendChild(characterName);

	characterWrapper.classList.add('character-wrapper');
	wrapper.appendChild(characterWrapper);
};

fetch(`${BASE_URL}${filteredArray.join(',')}`, {
	method: 'GET',
})
	.then((res) => res.json())
	.then((parsedData) => {
		if (filteredArray.length === 1) {
			createCard(parsedData);
		} else {
			parsedData.forEach((character, index) => {
				createCard(character);
			});
		}
	});
