'use strict';

let wrapper = document.querySelector('#wrapper');

const BASE_URL = 'https://rickandmortyapi.com/api/character/';
let favorites = localStorage.getItem('favoriteCharacters');
let parsedFavorites = JSON.parse(favorites);
let filteredArray = [...new Set(parsedFavorites)];

// Функция принимает данные и рендерит их в html
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

// через .join(",") превращем массив в строку разделяя элементы запятыми
fetch(`${BASE_URL}${filteredArray.join(',')}`, {
	method: 'GET',
})
	.then((res) => res.json())
	.then((parsedData) => {
		if (filteredArray.length === 1) {
			// если нам прилетаем объект то не итерируем его а просто передаем данные в функцию для рендеринга
			createCard(parsedData);
			// Здесь будет отрендерен только один персонаж, так как мы получили только один объект
		} else {
			// а если нам прилетает массив то проходим по нему и также передаем данные в функцию для рендеринга
			parsedData.forEach((character, index) => {
				createCard(character);
			});
			// Здесь будет отрендерено несколько персонажей
		}
	});
