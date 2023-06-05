const card = document.getElementById("card");
const clearCard = document.getElementById("clearCard");
const container = document.querySelector("ul");

let cardItems = {};

clearCard.addEventListener("click", clearCardAllItems);
card.addEventListener("click", showCard);

function addThisItem(e) {
	// зберігаємо дані без розмітки в LS. +
	// дані одного товару засунути в object +
	// придодаванні наступного товару перевіряти чи він вже є +
	// якщо є збільщити кількість  +
	// в LS зберігати обʼєкт обʼєктів

	// console.log(e.parentNode.dataset.itemId); // div data-item-id - ID
	// console.log(e.parentNode.firstElementChild.textContent); // h2 content - Name
	// console.dir(e.parentNode.children[2].children[0].textContent); // div p span - Prise

	// Записуємо в динамічні змінні дані ЦЬОГО продукта (на якому натиснута кнопка)
	let productID = e.parentNode.dataset.itemId; // div data-item-id - ID
	let productName = e.parentNode.firstElementChild.textContent; // h2 content - Name
	let productPrise = Number(e.parentNode.children[2].children[0].textContent); // div p span - Prise

	// перевірка чи є в LS {} cardItem
	if (!localStorage.getItem("cardItem")) {
		console.log("В LS не знайдено обʼєкт cardItem. Створюємо його.");
		cardItems = {};
		localStorage.setItem("cardItem", JSON.stringify(cardItems));
	}

	cardItems = JSON.parse(localStorage.getItem("cardItem"));

	// Перевірка.
	// Якщо з даним ключем(id) незнайдено даних, додаємо новий продукт в обʼєкт.
	if (!cardItems[productID]) {
		cardItems[productID] = {
			name: productName,
			prise: productPrise,
			quantity: 1,
		};
	} else {
		//якщо товар є, збільшуємо кулькість та ціну
		cardItems[productID].prise += productPrise; // збільшуємо ціну товару
		cardItems[productID].quantity++; // збільшуємо кількість шт ЦЬОГО товару
	}

	localStorage.setItem("cardItem", JSON.stringify(cardItems));
}

function showCard() {
	//витягує дані з LS +
	//додає дані в розмітку та вставляє в ul +

	if (!localStorage.length) {
		alert("В корзині ще немає товарів.");
		// console.log(!!localStorage.length);
	} else {
		let amountItms = 0;
		let totalPrice = 0;

		cardItems = JSON.parse(localStorage.getItem("cardItem")); // розпарсили JSON
		let cardItemsKeys = Object.keys(cardItems); // вивантажили ключі обʼєкта cardItems в масив cardItemsKeys

		// console.log(cardItemsKeys);
		container.innerHTML = ""; // очищення HTML від попередніх даних

		// вставляємо в ul шапку
		container.innerHTML = "<b> Name _______ Prices _ pieces </b>";

		// наповнюємо ul даними про товари додані в корзину
		// проходимось по сасиву ключів і почерзі взаємодіємо з кожним елементом ебʼєкту cardItems
		cardItemsKeys.forEach((index) => {
			amountItms += cardItems[index].quantity;
			totalPrice += cardItems[index].prise;

			container.innerHTML += `<li data-index=${index}>
            ${cardItems[index].name} __   
            ${cardItems[index].prise}$ _   
            ${cardItems[index].quantity}ps</l>`;
		});

		// додаємо узагальнюючий li
		container.innerHTML += `<p><b>Amount - ${amountItms}pices _  FullPrice - ${totalPrice}$</b></p>`;
	}
}

function clearCardAllItems() {
	container.innerHTML = ""; // очищення HTML
	cardItems = {}; // очищення змінної
	localStorage.clear(); // очищення LS

	console.log("Корзину очищено");
}
