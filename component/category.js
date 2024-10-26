document.addEventListener("DOMContentLoaded", () => {
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('product');
const category = categoryParam ? categoryParam.toLowerCase() : '';

const productsContainer = document.getElementById('product-item');

fetch('../data/product.json')
.then(response => response.json())
.then(data => {
if (category !== '') {
const filteredProducts = Object.values(data).filter(product => {
return product.category.toLowerCase().split(',').map(cat => cat.trim().replace(/\s+/g, '-')).includes(category.replace(/\s+/g, '-'));
});

if (filteredProducts.length > 0) {
filteredProducts.forEach(product => {

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


const productCard = `
<a class="product-flex" href="${product.link}" title="belanja ${product.title}" itemprop="url">
<article class="product-grid" itemprop="itemListElement" itemscope itemtype="https://schema.org/Product">
${product.price && product.oriprice ? `<div class="product-discount" itemprop="discount">${((parseFloat(product.oriprice.replace(/\./g, '')) - parseFloat(product.price.replace(/\./g, ''))) / parseFloat(product.oriprice.replace(/\./g, '')) * 100).toFixed(0)}%</div>` : ""}
<div class="product-image">
<img src="${product.image1}" alt="Belanja ${product.title}" loading="lazy" itemprop="image">
</div>
<div class="product-title">
<h3 itemprop="name">${product.title}</h3>
<div class="product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
<p class="product-getprice">${parseInt(product.price).toLocaleString('id-ID')}</p>
${product.oriprice ? `<p class="product-oriprice">${parseInt(product.oriprice).toLocaleString('id-ID')}</p>` : ""}
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
productsContainer.innerHTML += productCard;

// INSERT JSON-LD STRUCTURED DATA
const script = document.createElement('script');
script.type = "application/ld+json";
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);
});
} else {
const notFoundHTML = `<div id="product-not-found">Maaf, stok produk belum tersedia untuk kategori ini.</div>`;
productsContainer.innerHTML = notFoundHTML;
}
} else {
const notFoundHTML = `<div id="product-not-found">Upss terjadi kesalahan, kami tidak menemukan parameter kategori produk yang cocok.</div>`;
productsContainer.innerHTML = notFoundHTML;
}

// SET JUDUL SECTION
const categoryTitle = document.getElementById('category-title');
const formattedCategory = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
categoryTitle.textContent = `Kategori ${formattedCategory}`;

// SET JUDUL HALAMAN
const title = document.querySelector('title');
title.textContent = `Kategori - ${formattedCategory}`;
})
.catch(error => console.error('Error fetching the JSON data:', error));
});
