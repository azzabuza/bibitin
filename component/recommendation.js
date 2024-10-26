document.addEventListener("DOMContentLoaded", () => {
fetch('../data/product.json')
.then(response => response.json())
.then(data => displayRecommendationProducts(data))
.catch(error => console.error('Error fetching the JSON data:', error));
});

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}

function displayRecommendationProducts(products) {
const recommendationProductItem = document.getElementById("recommendation-product-item");

const productsArray = Object.values(products);
shuffleArray(productsArray);
const randomProducts = productsArray.slice(0, 10);

randomProducts.forEach(product => {
const productHTML = `
<li>
<a href="${product.link}" title="belanja ${product.title}">${product.title}</a>
</li>`;

recommendationProductItem.innerHTML += productHTML;
});
}
