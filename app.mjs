"use-strict";

import cartListItems from "./js/cart/cartListItems.js";
import totals from "./js/expenseTracker/totals.js";
import menuItems from "./js/items/items.js";
import menuListItems from "./js/menu/manuListItems.js";

const menu = document.querySelector("#menu");
const cartSummery = document.querySelector("#cart");

let cart = [];

window.onload = () => {
	createMenu();
	createCart();
	totals();
};

const setToLocalStorage = (/** @type {Array} */ item) =>
	localStorage.setItem("cart", JSON.stringify(item));

const getFromLocalStorage = () => JSON.parse(localStorage.getItem("cart"));

// ? Rerender
const reRender = () => {
	// * Clearing Menu for rendering
	cart = getFromLocalStorage();

	menu.innerHTML = ``;
	cartSummery.innerHTML = ``;

	// * Rerendering
	createMenu();
	createCart();
	totals();
};

// ? Creating Menu Items
// ? Also Used to Rerender Menu
const createMenu = () => {
	menuItems.forEach((item) => {
		// * Checking if Item already exists in cart
		let isAdded = getChecked(item);
		renderMenu(item, isAdded);
	});
};

// ? Processes the Checking for item in local storage
const checkCart = (/** @type {{ id: any; }} */ item) => {
	const savedCart = getFromLocalStorage();
	const cartItem = savedCart.find(
		(/** @type {{ id: any; }} */ orderedItem) => {
			if (orderedItem.id === item.id) return true;
			return false;
		}
	);
	if (cartItem != undefined) return true;
	else return false;
};

// ? Checks if Item Exists in Local Storage
const getChecked = (
	/** @type {{ id: any; name?: string; price?: number; image?: string; alt?: string; count?: number; }} */ item
) => {
	if (localStorage.getItem("cart")) {
		return checkCart(item);
	}
	return false;
};

// ? Function Used to Render Menu
const renderMenu = (
	/** @type {object} */ item,
	/** @type {boolean} */ isAdded
) => {
	const { li, button } = menuListItems(item, isAdded);
	menu.append(li);

	// * Button Click Event
	button.onclick = () => {
		if (button.innerText === "Add to Cart") {
			item.count = 1;
			setToCart(item);
		}
		reRender();
	};
};

const defaultCartSummery = () => {
	cartSummery.innerHTML = `<p class="empty">Your cart is empty.</p>`;
};

// ? Create Cart
const createCart = () => {
	if (localStorage.getItem("cart")) {
		const existingCart = getFromLocalStorage();
		// console.log(existingCart, existingCart.length);
		if (existingCart.length < 1) {
			defaultCartSummery();
			return;
		} else if (existingCart.length >= 1) {
			cart = getFromLocalStorage();
			cart.forEach((/** @type {any} */ item) => {
				renderCart(item);
			});
		}
		return;
	}
};

// ? Update Item Count
const changeCount = (
	/** @type {number} */ count,
	/** @type {string} */ checker
) => {
	if (checker === "decrease" && count > 0) {
		return (count -= 1);
	} else {
		return (count += 1);
	}
};

// ? Update Cart Items
const cartItemUpdate = (/** @type {object} */ item) => {
	let cartItems = getFromLocalStorage();

	const itemToUpdate = cartItems.find(
		(/** @type {{ id: any; }} */ cartItem) => cartItem.id === item.id
	);
	const replaceIndex = cartItems.indexOf(itemToUpdate);

	if (item.count >= 1) {
		cartItems[replaceIndex] = item;
	} else {
		const filteredCartItems = cartItems.filter(
			(/** @type {{ id: any; }} */ cartItem) => cartItem.id !== item.id
		);
		cartItems = filteredCartItems;
	}

	setToLocalStorage(cartItems);
	return cartItems;
};

//  ? Render Cart
const renderCart = (/** @type {object} */ item) => {
	const { count } = item;
	const { li, btnDecrease, btnIncrease } = cartListItems(item);

	cartSummery.append(li);

	btnDecrease.onclick = () => {
		// console.info("Clicked Decrease");
		const updatedCount = changeCount(count, "decrease");

		// console.log("decrease", item);
		cartItemUpdate({ ...item, count: updatedCount });
		reRender();
	};

	btnIncrease.onclick = () => {
		// console.info("Clicked Increase");
		const updatedCount = changeCount(count, "increase");

		cartItemUpdate({ ...item, count: updatedCount });
		reRender();
	};
};

// ? Set Cart to Local Storage
const setToCart = (/** @type {any} */ item) => {
	// * Cart Exists in Local Storage
	if (JSON.parse(localStorage.getItem("cart")).length >= 1) {
		cart = getFromLocalStorage();
		cart.push(item);
		setToLocalStorage(cart);
	}
	// * Cart Doesn't Exist in Local Storage
	else {
		setToLocalStorage([item]);
	}
};
