document.getElementById('add-to-cart-btn').addEventListener('click', function (e) {
    const productName = document.getElementById('product-name');
    const productQuantity = document.getElementById('product-quantity');
    if (productName.value === '' || productQuantity.value < 0) {
        alert('please provide a valid value');
        return;
    }
    setCartToLocalStorage(productName.value, productQuantity.value);
    productName.value = '';
    productQuantity.value = '';
    showCartItemFromLocalStorage();
    document.getElementById('remove-cart').classList.remove('d-none');
})

const setCartToLocalStorage = (productName, productQuantity) => {
    let cart = {}
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart[productName] = productQuantity;
    const cartStringify = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringify)
}

const showCartItemFromLocalStorage = () => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    const products = JSON.parse(localStorage.getItem('cart'));
    for (const product in products) {
        const li = document.createElement('li');
        li.classList.add('list-group-item')
        li.innerText = `${product}: ${products[product]}`;
        productContainer.appendChild(li);
    }
}

showCartItemFromLocalStorage();

document.getElementById('remove-cart').addEventListener('click', function (e) {
    localStorage.removeItem('cart');
    showCartItemFromLocalStorage();
    e.target.classList.add('d-none');
})

if (localStorage.getItem('cart')) {
    document.getElementById('remove-cart').classList.remove('d-none');
}