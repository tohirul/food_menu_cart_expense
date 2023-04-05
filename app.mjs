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
	const savedCart = JSON.parse(localStorage.getItem("cart"));
	const cartItem = savedCart.find((orderedItem) => {
		if (orderedItem.id === item.id) return true;
		return false;
	});
	if (cartItem != undefined) return true;
	else return false;
};

// ? Checks if Item Exists in Local Storage
const getChecked = (item) => {
	if (localStorage.getItem("cart")) {
		return checkCart(item);
	}
	return false;
};

// ? Rerender
const reRender = () => {
	// * Clearing Menu for rendering
	menu.innerHTML = ``;
	cartSummery.innerHTML = ``;

	// * Rerendering
	createMenu();
	createCart();
	totals();
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
			item.count += 1;
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
		const existingCart = JSON.parse(localStorage.getItem("cart"));
		console.log(existingCart, existingCart.length);
		if (existingCart.length > 0) {
			cart = JSON.parse(localStorage.getItem("cart"));
			cart.forEach((item) => {
				renderCart(item);
			});
			return;
		}
		defaultCartSummery();
		return;
	}
	defaultCartSummery();
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
	let cartItems = JSON.parse(localStorage.getItem("cart"));

	const itemToUpdate = cartItems.find((cartItem) => cartItem.id === item.id);
	const replaceIndex = cartItems.indexOf(itemToUpdate);

	if (item.count > 0) cartItems[replaceIndex] = item;
	else cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);

	localStorage.setItem("cart", JSON.stringify(cartItems));
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
		item.count = updatedCount;
		// console.log("decrease", item);
		cartItemUpdate(item);
		reRender();
	};

	btnIncrease.onclick = () => {
		// console.info("Clicked Increase");
		const updatedCount = changeCount(count, "increase");
		item.count = updatedCount;
		cartItemUpdate(item);
		reRender();
	};
};

// ? Set Cart to Local Storage
const setToCart = (/** @type {any} */ item) => {
	// * Cart Exists in Local Storage
	if (localStorage.getItem("cart")) {
		const cart = JSON.parse(localStorage.getItem("cart"));
		cart.push(item);
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	// * Cart Doesn't Exist in Local Storage
	else {
		localStorage.setItem("cart", JSON.stringify([item]));
	}
};
