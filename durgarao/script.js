const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const viewAllButton = document.getElementById('viewAllButton');
const watchListButton = document.getElementById('watchListButton');

searchInput.addEventListener('input', debounce(searchProducts, 300));

function searchProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    fetch(`https://products-api-2ttf.onrender.com/api/products?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Clear previous search results
            resultsContainer.innerHTML = '';
            displayFirstImage(data);
            // Show the buttons after displaying the first image
            viewAllButton.style.display = 'inline-block';
            watchListButton.style.display = 'inline-block';
            displayOtherImages(data);
            // Add fashion message
            displayFashionMessage();
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayFirstImage(products) {
    if (products.length > 0) {
        const firstProduct = products[0];
        const firstProductCard = createProductCard(firstProduct);
        resultsContainer.appendChild(firstProductCard);
    }
}

function displayOtherImages(products) {
    for (let i = 1; i < products.length; i++) {
        const product = products[i];
        const productCard = createProductCard(product);
        resultsContainer.appendChild(productCard);
    }
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productName = document.createElement('h3');
    productName.textContent = product.title;
    productCard.appendChild(productName);

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    return productCard;
}

function displayFashionMessage() {
    const fashionMessage = document.createElement('p');
    fashionMessage.textContent = "Fashion is not about clothes, it's about how you look";
    fashionMessage.style.fontSize = '30px';
    fashionMessage.style.width = '300px';
    fashionMessage.style.padding = '30px';
    fashionMessage.style.border = '5px solid pink';
    resultsContainer.appendChild(fashionMessage);
}


// Debounce function to limit API requests while typing
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}