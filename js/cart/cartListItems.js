const cartListItems = (
	/** @type {{ name: any; price: any; image: any; alt: any; count: any; id: any; }} */ item
) => {
	const { name, price, image, alt, count, id } = item;

	const li = document.createElement("li");

	// ? Food Plate
	const plate = document.createElement("div");
	plate.classList.add("plate");
	plate.innerHTML = `
		<img src=${image} alt=${alt} class="plate" />
              <div class="quantity">${count}</div>
		`;

	// ? Content
	const content = document.createElement("div");
	content.classList.add("content");
	content.innerHTML = `
			<p class="menu-item">${name}</p>
             <p class="price">$${price}</p>
		`;

	// ? Quantity Container
	const quantityContainer = document.createElement("div");
	quantityContainer.classList.add("quantity__wrapper");

	// ? Decrease Button
	const btnDecrease = document.createElement("button");
	btnDecrease.classList.add("decrease");
	btnDecrease.innerHTML = `<img src="./images/chevron.svg" />`;
	quantityContainer.appendChild(btnDecrease);

	// ? Quantity
	const quantity = document.createElement("div");
	quantity.classList.add("quantity");
	quantity.innerHTML = `${count}`;
	quantityContainer.appendChild(quantity);

	// ? Increase Button
	const btnIncrease = document.createElement("button");
	btnIncrease.classList.add("increase");
	btnIncrease.innerHTML = `<img src="./images/chevron.svg" />`;
	quantityContainer.appendChild(btnIncrease);

	// ? Subtotal
	const subtotal = document.createElement("div");
	subtotal.classList.add("subtotal");
	subtotal.innerText = `$${price * count}`;

	li.appendChild(plate);
	li.appendChild(content);
	li.appendChild(quantityContainer);
	li.appendChild(subtotal);

	return { li, btnDecrease, btnIncrease };
};

export default cartListItems;
