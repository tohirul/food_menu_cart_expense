const menuListItems = (
	/** @type {{ name: any; price: any; image: any; alt: any; count: any; id: any; }} */ item,
	/** @type {boolean} */ isAdded
) => {
	const { name, price, image, alt, count, id } = item;
	const li = document.createElement("li");

	// * Image Container
	const imageContainer = document.createElement("div");
	imageContainer.classList.add("plate");
	imageContainer.innerHTML = `
          <img src=${image} alt=${alt} class="plate" />
        `;

	// * Content Container
	const contentContainer = document.createElement("div");
	contentContainer.classList.add("content");
	contentContainer.innerHTML = `
         <p class="menu-item">${name}</p>
              <p class="price">$${price}</p>
        `;

	// * Button
	const button = document.createElement("button");

	// * Condition for button options
	if (isAdded) {
		button.classList.add("in-cart");
		// button.setAttribute("class", "in-cart");
		button.setAttribute("id", id);
		button.innerHTML = `
            <img src="images/check.svg" alt="Check" />
                In Cart
            `;
	} else if (!isAdded) {
		button.classList.add("add");
		// button.setAttribute("class", "add");
		button.setAttribute("id", id);
		button.innerHTML = `Add to Cart`;
	}

	li.appendChild(imageContainer);
	contentContainer.appendChild(button);
	li.appendChild(contentContainer);

	return { li, button };
};

export default menuListItems;
