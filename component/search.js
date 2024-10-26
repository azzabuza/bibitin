document.addEventListener("DOMContentLoaded", () => {
fetch('../data/product.json')
.then(response => response.json())
.then(data => {
displayProducts(data);

// INSERT JSON-LD STRUCTURED DATA
data.forEach(product => {
const structuredData = {
"@context": "https://schema.org/",
"@type": "Product",
"name": product.title,
"image": product.image1,
"description": product.description.join(" "),
"offers": {
"@type": "Offer",
"priceCurrency": "IDR",
"price": parseFloat(product.price.replace(/\./g, '')).toFixed(2),
"priceValidUntil": "2028-01-30",
"url": product.link,
"itemCondition": "https://schema.org/NewCondition",
"availability": "https://schema.org/InStock"
},
"brand": {
"@type": "Brand",
"name": "BIBITIN NUSANTARA"
},
"hasMerchantReturnPolicy": {
"@type": "MerchantReturnPolicy",
"applicableCountry": "IDN",
"returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
"merchantReturnDays": "3",
"returnMethod": "https://schema.org/ReturnByMail",
"returnFees": "https://schema.org/FreeReturn"
}
};

const script = document.createElement('script');
script.type = "application/ld+json";
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);
});
})
.catch(error => console.error('Error fetching the JSON data:', error));
});

function displayProducts(shoppings) {
const productList = document.getElementById('search-list');
const productHTML = Object.values(shoppings).map(product => `
<a class="search-flex" href="${product.link}" itemprop="url">
<article class="search-grid" itemprop="itemListElement" itemscope itemtype="https://schema.org/Product">
<div class="search-image">
<img src="${product.image1}" alt="Belanja ${product.title}" loading="lazy" itemprop="image">
</div>
<div class="search-info">
<h3 itemprop="name">${product.title}</h3>
<div="search-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
<p class="search-getprice">${parseInt(product.price).toLocaleString('id-ID')}</p>
${product.oriprice ? `<p class="search-oriprice">${parseInt(product.oriprice).toLocaleString('id-ID')}</p>` : ""}
<meta itemprop="price" content="${parseFloat(product.price).toFixed(2).toLocaleString('id-ID')}" />
<meta itemprop="priceCurrency" content="IDR" />
<meta itemprop="availability" content="https://schema.org/InStock" />
<meta itemprop="priceValidUntil" content="2028-01-30" />
<meta itemprop="hasMerchantReturnPolicy" content="https://www.bibitin.com/legal/terms.html" />
</div>
<meta itemprop="description" content="${product.description.join(' ').replace(/(<([^>]+)>)/gi, '')}" />
</div>
</article>
</a>
`).join('');
productList.innerHTML = productHTML;
}

function search() {
const searchbox = document.getElementById('search-item').value.toUpperCase();
const productSearch = document.querySelectorAll('.search-flex');
let foundProduct = false;

for (const item of productSearch) {
const productSearchName = item.querySelector('h3');
if (productSearchName) {
const textvalue = productSearchName.textContent.toUpperCase();
if (textvalue.includes(searchbox)) {
item.style.display = 'block';
foundProduct = true;
} else {
item.style.display = 'none';
}
}
}

if (searchbox === '') {
productSearch.forEach(item => {
item.style.display = 'block';
});
}

const notFoundMessage = document.getElementById('search-not-found');
if (notFoundMessage) {
if (!foundProduct && searchbox !== '') {
notFoundMessage.style.display = 'block';
} else {
notFoundMessage.style.display = 'none';
}
}
}

document.getElementById('search-item').addEventListener('input', search);
