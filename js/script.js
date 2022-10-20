'use strict';

let randomButton = document.querySelector('#random-button');
let favoriteButton = document.querySelector('#add-to-favorite');

let characterImage = document.querySelector('#character-image');
let characterName = document.querySelector('#character-name');

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

const getRandomNumber = () => {
	return Math.floor(Math.random() * (826 - 1 + 1) + 1);
};

const getCharacter = (randomNumber) => {
	return fetch(`${BASE_URL}${randomNumber}`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((parsedData) => {
			characterImage.src = parsedData.image;
			characterName.textContent = parsedData.name;
		});
};

getCharacter(1); // get rick sanchez character
localStorage.setItem('currentCharacterId', 1);

randomButton.onclick = () => {
	let randomNumber = getRandomNumber();

	localStorage.setItem('currentCharacterId', randomNumber);
	getCharacter(randomNumber);
};
favoriteButton.onclick = () => {
	let currentCharacterId = localStorage.getItem('currentCharacterId');
	let favorites = localStorage.getItem('favoriteCharacters');
	let parsedFavorites = JSON.parse(favorites);

	if (parsedFavorites !== null) {
		let filteredArray = [...new Set(parsedFavorites)];

		localStorage.setItem(
			'favoriteCharacters',
			JSON.stringify([...filteredArray, currentCharacterId])
		);
	} else {
		localStorage.setItem('favoriteCharacters', JSON.stringify([currentCharacterId]));
	}
};
