document.addEventListener("DOMContentLoaded", () => {
fetch('../data/product.json')
.then(response => response.json())
.then(data => displayRelatedProducts(data))
.catch(error => console.error('Error fetching the JSON data:', error));
});

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}

function displayRelatedProducts(shoppings) {
const relatedProductItem = document.getElementById("related-product-item");

const shoppingsArray = Object.values(shoppings);
shuffleArray(shoppingsArray);
const randomProducts = shoppingsArray.slice(0, 6);

randomProducts.forEach(product => {

// CREATE JSON-LD STRUCTURED DATA
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

// LOOPING HTML
const productHTML = `
<a class="related-product-flex" href="${product.link}" title="belanja ${product.title}" itemprop="url">
<article class="related-product-grid" itemprop="itemListElement" itemscope itemtype="https://schema.org/Product">
${product.price && product.oriprice ? `<div class="related-product-discount" itemprop="discount">${((parseFloat(product.oriprice.replace(/\./g, '')) - parseFloat(product.price.replace(/\./g, ''))) / parseFloat(product.oriprice.replace(/\./g, '')) * 100).toFixed(0)}%</div>` : ""}
<div class="related-product-image">
<img src="${product.image1}" alt="Belanja ${product.title}" loading="lazy" itemprop="image">
</div>
<div class="related-product-title">
<h3 itemprop="name">${product.title}</h3>
<div class="related-product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
<p class="related-product-getprice">${parseInt(product.price).toLocaleString('id-ID')}</p>
${product.oriprice ? `<p class="related-product-oriprice">${parseInt(product.oriprice).toLocaleString('id-ID')}</p>` : ""}
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
`;
relatedProductItem.innerHTML += productHTML;

// INSERT JSON-LD STRUCTURED DATA
const script = document.createElement('script');
script.type = "application/ld+json";
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);
});
}
