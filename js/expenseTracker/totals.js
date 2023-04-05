const totals = () => {
	const expense = document.querySelector(".expense");
	expense.innerHTML = ``;

	const currentCart = JSON.parse(localStorage.getItem("cart"));
	// console.log(currentCart);

	let currentSubtotal = 0;
	let tax = 0;
	if (localStorage.getItem("cart")) {
		currentCart.forEach(
			(/** @type {{ price: number; count: number; }} */ item) => {
				const { price, count } = item;
				currentSubtotal += price * count;
				tax += count * 0.0975;
			}
		);
	}
	const total = (currentSubtotal + tax).toFixed(2);
	const totalContainer = document.createElement("div");
	totalContainer.classList.add("totals");
	totalContainer.innerHTML = `<div class="line-item">
            <div class="label">Subtotal:</div>
            <div class="amount price subtotal">$${currentSubtotal}</div>
          </div>
          <div class="line-item">
            <div class="label">Tax:</div>
            <div class="amount price tax">$${tax.toFixed(2)}</div>
          </div>
          <div class="line-item total">
            <div class="label">Total:</div>
            <div class="amount price total">$${total}</div>
          </div>`;
	expense.appendChild(totalContainer);
};

export default totals;
