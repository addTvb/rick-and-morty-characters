'use strict';

let randomButton = document.querySelector('#random-button');
let favoriteButton = document.querySelector('#add-to-favorite');

let characterImage = document.querySelector('#character-image');
let characterName = document.querySelector('#character-name');

const BASE_URL = 'https://rickandmortyapi.com/api/character/';
// Функция генерации рандомного числа от 1 до 826
const getRandomNumber = () => {
	return Math.floor(Math.random() * (826 - 1 + 1) + 1);
};
// Запрашиваем из API рандомного персонажа
const getCharacter = (randomNumber) => {
	return fetch(`${BASE_URL}${randomNumber}`, {
		// соединяем url с рандомным числом с помощью - ``
		method: 'GET',
	})
		.then((res) => res.json()) // Превращаем полученные данные в json
		.then((parsedData) => {
			// parsedData это уже превращенные в json данные из запроса
			// здесь мы встраиваем имя и ссылку на картинку в html
			characterImage.src = parsedData.image;
			characterName.textContent = parsedData.name;
		});
};

// По умолчанию всегда запрашиваем первого персонажа и в localStorage помещаем его id
getCharacter(1);
localStorage.setItem('currentCharacterId', 1);

randomButton.onclick = () => {
	// генерируем рандомное число
	let randomNumber = getRandomNumber();
	// Сохраняем это число в localStorage
	localStorage.setItem('currentCharacterId', randomNumber);
	// а также запрашиваем персонажа с таким id
	getCharacter(randomNumber);
};

favoriteButton.onclick = () => {
	// id текущий персонаж на главной странице
	let currentCharacterId = localStorage.getItem('currentCharacterId');
	// строка с перечисленными id выбранных персонажей
	let favorites = localStorage.getItem('favoriteCharacters');
	// Строка превращенная в массив
	let parsedFavorites = JSON.parse(favorites);

	// Если в избранных уже есть персонажи то...
	if (parsedFavorites !== null) {
		// Удаляем дубликаты
		let filteredArray = [...new Set(parsedFavorites)];
		// И обновляем список избранных персонажей
		localStorage.setItem(
			'favoriteCharacters',
			JSON.stringify([...filteredArray, currentCharacterId])
		);
	} else {
		// Иначе добавляем только текущего персонажа в избранное
		localStorage.setItem('favoriteCharacters', JSON.stringify([currentCharacterId]));
	}
};
