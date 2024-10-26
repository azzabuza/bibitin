document.addEventListener("DOMContentLoaded", () => {
fetch('../data/category-menu.json')
.then(response => response.json())
.then(data => {
displayCategories(data);
})
.catch(error => console.error('Error fetching the JSON data:', error));
});

function displayCategories(categories) {
const container = document.getElementById('category-item');
categories.forEach(category => {
const categoryHTML = `
<a class="category-flex" href="${category.url}" title="Kategori ${category.title}" itemprop="url">
<div class="category-grid" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
<div class="category-image">
<img src="${category.image}" alt="Belanja ${category.title}" loading="lazy">
</div>
<div class="category-info">
<p>${category.title}</p>
</div>
</div>
</a>
`;
container.innerHTML += categoryHTML;
});
}
