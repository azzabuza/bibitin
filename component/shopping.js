// URL PARAMETER GENERATOR
function getParameterByName(name, url) {
if (!url) url = window.location.href;
name = name.replace(/[\[\]]/g, '\\$&');
var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
results = regex.exec(url);
if (!results) return null;
if (!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// GENERATE DYNAMIC PRODUCT PAGE
function displayProductDetails() {
var selectedProduct = getParameterByName('product');
var shoppingContainer = document.getElementById('shopping-container');

// GET DATA FROM JSON
fetch('../data/product.json')
.then(response => response.json())
.then(shoppings => {
if (selectedProduct && shoppings[selectedProduct]) {
var product = shoppings[selectedProduct];

// META TAG GENERATOR
document.title = product.title + " - Bibitin";
document.getElementById('metaTitle').content = product.title + " - Bibitin";
document.getElementById('ogTitle').content = product.title + " - Bibitin";
document.getElementById('twitterTitle').content = product.title + " - Bibitin";

var descriptionText = product.description ? product.description.join(" ") : "Temukan produk terbaik di Bibitin.";
document.getElementById('metaDescription').content = descriptionText;
document.getElementById('ogDescription').content = descriptionText;
document.getElementById('twitterDescription').content = descriptionText;

var metaImage = product.image1 || "https://bibitin.com/asset/image/app.png";
document.getElementById('metaImage').content = metaImage;
document.getElementById('ogImage').content = metaImage;
document.getElementById('twitterImage').content = metaImage;

var canonicalLink = product.link || "https://bibitin.com";
document.querySelector('link[rel="canonical"]').href = canonicalLink;  

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
"itemCondition": "https://schema.org/UsedCondition",
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

// INSERT STRUCTURED DATA INTO DOM
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);

// HTML LOOPING
var shoppingHTML = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
 <!-- META TITLE -->
<title id="metaTitle">Belanja - Bibitin</title>
<meta property="og:title" id="ogTitle" content="Belanja - Bibitin">
<meta name="twitter:title" id="twitterTitle" content="Belanja - Bibitin">
<!-- META DESCRIPTION -->
<meta name="description" id="metaDescription" content="Buka link halaman untuk melihat produk terbaik di Bibitin">
<meta property="og:description" id="ogDescription" content="Buka link halaman untuk melihat produk terbaik di Bibitin">
<meta name="twitter:description" id="twitterDescription" content="Buka link halaman untuk melihat produk terbaik di Bibitin">
<!-- META IMAGE -->
<meta property="image" id="metaImage" content="https://bibitin.com/asset/image/app.png">
<meta property="og:image" id="ogImage" content="https://bibitin.com/asset/image/app.png">
<meta name="twitter:image" id="twitterImage" content="https://bibitin.com/asset/image/app.png">
<!-- META INDEX -->
<meta name="robots" content="index,follow"/>
<link rel="canonical" href="https://bibitin.com"/>
<!-- FACEBOOK -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://bibitin.com">
<!-- TWITTER -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@bibitin">
<!-- MOBILE -->
<meta content="yes" name="mobile-web-app-capable"/>
<meta content="yes" name="apple-touch-fullscreen"/>
<meta content="Bibitin" name="apple-mobile-web-app-title"/>
<meta content="Bibitin" name="application-name"/>
<meta content="yes" name="apple-mobile-web-app-capable"/>
<meta content="Bibitin" name="apple-mobile-web-app-status-bar-style"/>
<link rel="icon" type="images/x-icon" href="../asset/image/favicon.png">
<meta name="theme-color" content="#008000">
<!-- PLUGIN -->
<link href="../asset/css/style.css" rel="stylesheet">
<link href="../asset/css/responsive.css" rel="stylesheet">
</head>
<body>
<div class="content-wrapper">
<section class="header" id="header"></section>
<section class="shopping">
<h2 id="title-shope">Rincian Produk</h2>
<div class="shopping-box" id="shopping-container">
<article class="shopping-left">
<div class="shopping-grid">
<div class="shopping-data">
<div class="shopping-data-left">
<div class="shopping-banner">
<img src="${product.image1}" alt="Belanja ${product.title}" class="main-image" loading="lazy">
</div>
<div class="thumbnail-box">
<div class="thumbnail-grid"><img src="${product.image1}" alt="Belanja ${product.title}" onclick="changeImage('${product.image1}')" loading="lazy"></div>
${product.image2 ? `<div class="thumbnail-grid"><img src="${product.image2}" alt="Belanja ${product.title}" onclick="changeImage('${product.image2}')" loading="lazy"></div>`: ""}
${product.image3 ? `<div class="thumbnail-grid"><img src="${product.image3}" alt="Belanja ${product.title}" onclick="changeImage('${product.image3}')" loading="lazy"></div>`: ""}
</div>
</div>
<div class="shopping-data-right">
<div class="shopping-title" id="initialproduct" itemprop="name">${product.title}</div>
<div class="shopping-price" id="initialprice" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
<p class="shopping-getprice" itemprop="price">${parseInt(product.price).toLocaleString('id-ID')}</p>
${product.oriprice ? `<p class="shopping-oriprice">${parseInt(product.oriprice).toLocaleString('id-ID')}</p>`: ""}
${product.price && product.oriprice ? `<span class="shopping-discount" itemprop="discount">${((parseFloat(product.oriprice.replace(/\./g, '')) - parseFloat(product.price.replace(/\./g, ''))) / parseFloat(product.oriprice.replace(/\./g, '')) * 100).toFixed(0)}%</span>` : ""}
</div>
<meta itemprop="priceCurrency" content="IDR" />
<meta itemprop="availability" content="https://schema.org/InStock" />
<meta itemprop="priceValidUntil" content="2028-01-30" />
<meta itemprop="hasMerchantReturnPolicy" content="https://www.bibitin.com/legal/terms.html" />
<div class="shopping-detail">
<h3>Detail produk:</h3>
<table>
<tr>
<td>Kategori</td>
<td style="font-weight:600;">${product.category}</td>
</tr>
<tr>
<tr>
<td>Satuan</td>
<td style="font-weight:600;">${product.unit}</td>
</tr>
<tr>
<td>Tinggi</td>
<td style="font-weight:600;">${product.height} cm</td>
</tr>
<tr>
<td>Lebar</td>
<td style="font-weight:600;">${product.width} cm</td>
</tr>
<tr>
<td>Panjang</td>
<td style="font-weight:600;">${product.length} cm</td>
</tr>
<tr>
<td>Berat</td>
<td id="weight" style="font-weight:600;">${product.weight} kg</td>
</tr>
<tr>
<td>Isi</td>
<td style="font-weight:600;">${product.content}</td>
</tr>
</table>
</div>
</div>
</div>
<div class="shopping-content">
<h3>Deskripsi produk:</h3>
<div id="shopping-description">`;
for (var p = 0; p < product.description.length; p++) {
shoppingHTML += `<p>${product.description[p]}</p>`;
}
shoppingHTML += `</div>
</div>
<div class="announcement">
<h3>Catatan penting:</h3>
<ul>
<li>Patuhi semua <a href="../legal/policy.html">Kebijakan Pengguna</a> dan <a href="../legal/terms.html">Syarat & Ketentuan</a> yang berlaku pada situs Bibitin.com.</li>
<li>Isi semua <b>formulir</b> pembelian secara lengkap, dan benar agar produk yang kamu pesan sampai tujuan.</li>
<li>Setelah menerima <b>invoice</b> otomatis melalui <b>whatsapp (official)</b> silahkan lakukan pembayaran sesuai jumlah total dan metode yang dipilih.</li>
</ul>
</div>
</div>
</article>
<aside class="shopping-right" id="shopping-form">
<div class="shopping-grid">
<form class="shopping-hero" id="shopform" name="shoppingnow" autocomplete="off" method="POST">
<h3>Formulir pembelian:</h3>
<div class="shopping-form">
<label>Produk</label>
<div class="shopping-input" style="background:#f5f5f5;">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" />
</svg>
<input id="product" name="product" type="text" placeholder="Produk" value="${product.title}" autocomplete="off" readonly="true" maxlength="300" minlength="3" style="font-weight:500;" required>
</div>
</div>
<div class="shopping-form">
<label>Jumlah Barang</label>
<div class="shopping-input">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" />
</svg>
<select id="amount" name="amount" onchange="amountProduct(this.value)" oninput="amountProduct(this.value)" required>
<option disabled selected hidden value="">Jumlah produk</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="10">10</option>
<option value="20">20</option>
<option value="30">30</option>
<option value="40">40</option>
<option value="50">50</option>
</select>
</div>
</div>
<div class="shopping-form" id="name-container" style="display: none;">
<label>Nama Lengkap</label>
<div class="shopping-input">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>
<input id="name" name="name" type="text" placeholder="Nama lengkap" value="" autocomplete="off" maxlength="300" minlength="3" required>
</div>
</div>
<div class="shopping-form" id="whatsapp-container" style="display: none;">
<label>Nomor Whatsapp</label>
<div class="shopping-input">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
</svg>
<input id="whatsapp" name="whatsapp" type="number" placeholder="081XXXXXXXXX" value="" autocomplete="off" maxlength="13" minlength="3" required>
</div>
</div>
<div class="shopping-form" id="province-container" style="display: none;">
<label>Provinsi</label>
<div class="shopping-input">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
</svg>
<select id="province" name="province" onchange="updateCities()" required>
<option disabled selected hidden value="">Pilih provinsi</option>
<option value="jakarta">Jakarta</option>
<option value="banten">Banten</option>
<option value="jawa-barat">Jawa Barat</option>
<option value="jawa-tengah">Jawa Tengah</option>
<option value="jawa-timur">Jawa Timur</option>
<option value="yogyakarta">Yogyakarta</option>
<option value="kalimantan-barat">Kalimantan Barat</option>
</select>
</div>
</div>
<div class="shopping-form" id="regency-container" style="display: none;">
<label>Kabupaten/Kota</label>
<div class="shopping-input">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" /><path d="M8 7l0 .01" /><path d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z" /><path d="M16 15l0 .01" />
</svg>
<select id="regency" name="regency" onchange="calculateTotal()" required>
<option disabled selected hidden value="">Pilih kota</option>
</select>
</div>
</div>
<div class="shopping-form" id="address-container" style="display: none;">
<label>Alamat</label>
<div class="shopping-input">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" /><path d="M12 2l0 2" /><path d="M12 20l0 2" /><path d="M20 12l2 0" /><path d="M2 12l2 0" />
</svg>
<textarea id="address" name="address" type="text" placeholder="Jalan, RT, RW, Desa, Kecamatan, Kode pos" value="" autocomplete="off" minlength="10" required></textarea>
</div>
</div>
<div class="shopping-form" id="payment-container" style="display: none;">
<label>Metode Pembayaran</label>
<div class="shopping-input">
<svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" /><path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
</svg>
<select id="payment" name="payment" onchange="paymentProduct()" required>
<option disabled selected hidden value="">Metode pembayaran</option>
<option value="BCA 8465779027">BCA 8465779027</option>
<option value="DANA 081229706872">DANA 08122976872</option>
</select>
</div>
</div>
<div id="shopping-information">
<table>
<tr>
<td>Harga Satuan</td>
<td><input id="price" name="price" type="text" placeholder="0" readonly="true" value="0" style="font-weight:500;" required></td>
</tr>
<tr>
<td>Total Harga</td>
<td><input id="subtotal" name="subtotal" type="text" placeholder="0" readonly="true" value="0" style="font-weight:700;" required></span></td>
</tr>
<tr>
<td>Ongkir Satuan (kg)</td>
<td><input id="shipping" name="shipping" type="text" placeholder="0" readonly="true" value="0" style="font-weight:500;" required></span></td>
</tr>
<tr>
<td>Total Ongkir</td>
<td><input id="shipping-total" name="shipping total" type="text" placeholder="0" readonly="true" value="0" style="font-weight:700;" required></span></td>
</tr>
<tr>
<td>Biaya Admin</td>
<td><input id="fee" name="fee" type="text" placeholder="0" readonly="true" value="Rp 2.000" style="font-weight:500;" required></span></td>
</tr>
<tr>
<td>Total</td>
<td><input id="total" name="total" type="text" placeholder="0" readonly="true" value="0" style="font-weight:700;" required></td>
</tr>
</table>
</div>
<div class="btn-area" id="btnarea">
<button id="shopping-button" name="submit" type="submit" value="Submit" title="beli sekarang" onclick="orderInfo()">Beli Sekarang</button>
<div id="waiting-process">Tunggu.</div>
</div>
</form>
</div>
</aside>
</div>
</section>
<section class="related-product" itemscope itemtype="https://schema.org/ItemList">
<h2>Produk Lainnya</h2>
<div class="related-product-box" id="related-product-item"></div>
</section>
<section class="footer" id="footer"></section>
<section class="order" id="order"></section>
</div>
<script type="text/javascript" src="../component/shopping.js"></script>
<script type="text/javascript" src="../component/related.js"></script>
<script type="text/javascript" src="../asset/js/style.js"></script>
</body>
</html>
`;

shoppingContainer.innerHTML = shoppingHTML;

// ATTACH EVENT LISTENERS
attachFormSubmitListener();
} else {
var notFoundHTML = `<div id="product-not-found">Maaf, produk tidak tersedia. Silahkan kembali ke halaman beranda atau memilih rekomendasi produk lainnya.</div>`;
shoppingContainer.innerHTML = notFoundHTML;
}
})
.catch(error => console.error('Error:', error));
}

// CHANGE IMAGES
function changeImage(imageSrc) {
document.querySelector('.main-image').src = imageSrc;
}

// TRIGGER SELECT AMOUNT
function amountProduct() {
const amountTrigger = document.getElementById('amount').value;
const customerName = document.getElementById('name-container');
const customerWhatsapp = document.getElementById('whatsapp-container');
const customerProvince = document.getElementById('province-container');
if (amountTrigger) {
customerName.style.display = 'block';
customerWhatsapp.style.display = 'block';
customerProvince.style.display = 'block';
} else {
customerName.style.display = 'none';
customerWhatsapp.style.display = 'none';
customerProvince.style.display = 'none';
}
}

// TRIGGER SELECT PAYMENT
function paymentProduct() {
const paymentTrigger = document.getElementById('payment').value;
const shoppingInformation = document.getElementById('shopping-information');
if (paymentTrigger) {
shoppingInformation.style.display = 'block';
} else {
shoppingInformation.style.display = 'none';
}
}

// SHIPPING COST & CALCULATION
fetch('../data/shipping.json')
.then(response => response.json())
.then(data => {
citiesByProvince = data;
})
.catch(error => {
console.error('Error fetching the cities data:', error);
});

function updateCities() {
const provinceSelect = document.getElementById("province");
const regencySelect = document.getElementById("regency");
const shippingInput = document.getElementById("shipping");
const selectedProvince = provinceSelect.value;

regencySelect.innerHTML = '<option disabled selected hidden value="">Pilih Kota</option>';
shippingInput.value = '0';

if (citiesByProvince && selectedProvince in citiesByProvince) {
document.getElementById("regency-container").style.display = "block";
document.getElementById("address-container").style.display = "block";
document.getElementById("payment-container").style.display = "block";
const cities = citiesByProvince[selectedProvince];
cities.forEach(regency => {
const option = document.createElement("option");
option.value = regency.shipping;
option.text = `${regency.name}`;
regencySelect.appendChild(option);
});
} else {
document.getElementById("regency-container").style.display = "none";
}

calculateTotal();
}

// CALCULATION
function calculateTotal() {
const currency = 'Rp ';
const amount = parseInt(document.getElementById('amount').value) || 0;
const productPrice = document.getElementById('initialprice').innerText;
const price = parseFloat(productPrice.replace('Rp', '').replace(/\.|,/g, '')) || 0;
const shipping = parseFloat(document.getElementById('regency').value) || 0;
console.log("Shipping (ongkir) yang dipilih:", shipping);
const weight = parseFloat(document.getElementById('weight').innerText) || 0;
const fee = 2000;
const totalprice = amount * price;

if (amount > 0) {
const subTotal = price * amount;
const shippingTotal = shipping * amount * weight;
console.log("Shipping Total (Ongkir Total):", shippingTotal);
const total = totalprice + fee + shippingTotal;
const formattedTotal = currency + total.toLocaleString('id-ID');

// DISPLAY NUMERIC DATA
document.getElementById('price').value = currency + price.toLocaleString('id-ID');
document.getElementById('subtotal').value = currency + subTotal.toLocaleString('id-ID');
document.getElementById('total').value = formattedTotal;
document.getElementById('shipping').value = currency + shipping.toLocaleString('id-ID');
document.getElementById('shipping-total').value = currency + shippingTotal.toLocaleString('id-ID');

// AMOUNT & REGENCY ON CHANGE
document.getElementById('amount').addEventListener('change', calculateTotal);
document.getElementById('regency').addEventListener('change', calculateTotal);
}
}

// ORDER INFORMATION
function orderInfo() {
var dataProduct = document.getElementById('product').value;
var dataAmount = document.getElementById('amount').value;
var dataName = document.getElementById('name').value;
var provinsi = document.getElementById('province');
var selectedProvince = provinsi.options[provinsi.selectedIndex].text;
var kabupaten = document.getElementById('regency');
var selectedRegency = kabupaten.options[kabupaten.selectedIndex].text;
var dataAddress = document.getElementById('address').value;
var dataPayment = document.getElementById('payment').value;
var dataWhatsapp = document.getElementById('whatsapp').value;
var dataPrice = document.getElementById('price').value;
var dataSubtotal = document.getElementById('subtotal').value;
var dataShipping = document.getElementById('shipping').value;
var dataShippingTotal = document.getElementById('shipping-total').value;
var dataTotal = document.getElementById('total').value;

// VALIDASI FORM
if (!dataProduct || !dataAmount || !dataName || !selectedProvince || !selectedRegency || !dataAddress || !dataPayment || !dataWhatsapp || !dataPrice || !dataSubtotal || !dataShipping || !dataShippingTotal || !dataTotal) {
alert('Upss, semua formulir harus diisi dengan lengkap dan benar agar orderanmu nanti tidak ada kendala.');
return false;
}

var orderData = {
product: dataProduct,
amount: dataAmount,
name: dataName,
province: selectedProvince,
regency: selectedRegency,
address: dataAddress,
payment: dataPayment,
whatsapp: dataWhatsapp,
price: dataPrice,
subtotal: dataSubtotal,
shipping: dataShipping,
shippingTotal: dataShippingTotal,
total: dataTotal,
status: 'success'
};

localStorage.setItem('orderData', JSON.stringify(orderData));
return true;
}


// CONNECT TO DATABASE
const scriptURL = 'https://script.google.com/macros/s/AKfycbwSZrDzAsxws-Ho0JL6vHdy0xE5JZ_jP2E3glDl-tdYfiIvbKnmhO0Id6zMlAIxtlzr/exec';

function attachFormSubmitListener() {
const form = document.forms['shoppingnow'];
const btnShop = document.getElementById("shopping-button");
const waitingInfo = document.getElementById("waiting-process");

form.addEventListener('submit', e => {
e.preventDefault();

btnShop.style.display = "none";
waitingInfo.style.display = "block";

const productInput = document.getElementById('product');
const originalProductValue = productInput.value;

const formData = new FormData(form);

const provinceSelect = document.getElementById("province");
if (provinceSelect.selectedIndex !== -1) {
const selectedProvinceName = provinceSelect.options[provinceSelect.selectedIndex].text;
formData.set('province', selectedProvinceName);
}

const regencySelect = document.getElementById("regency");
if (regencySelect.selectedIndex !== -1) {
const selectedRegencyName = regencySelect.options[regencySelect.selectedIndex].text;
formData.set('regency', selectedRegencyName);
}

fetch(scriptURL, { method: 'POST', body: formData })
.then(response => {
btnShop.style.display = "block";
waitingInfo.style.display = "none";

if (orderInfo()) {
form.reset();
productInput.value = originalProductValue;
productInput.readOnly = true;

const orderData = JSON.parse(localStorage.getItem('orderData')) || {};
orderData.status = 'success';
localStorage.setItem('orderData', JSON.stringify(orderData));
window.location.href = '../page/status.html';
console.log('DATA ORDERAN BERHASIL TERKIRIM KE DATABASE', response);
}
})
.catch(error => {
const errorData = {
status: 'error'
};
localStorage.setItem('orderData', JSON.stringify(errorData));
window.location.href = '../page/status.html';
console.error('DATA ORDERAN GAGAL TERKIRIM KE DATABASE', error.message);
});
});
}

// MENAMPILKAN DETAIL PRODUK
document.addEventListener('DOMContentLoaded', function () {
displayProductDetails();
});

// SCROLL ORDER EVENT
window.addEventListener('scroll', function() {
var targetDiv = document.getElementById('shopping-form');
var menu = document.getElementById('order');

if (targetDiv && menu) {
var rect = targetDiv.getBoundingClientRect();

if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
menu.classList.remove('hidden');
} else {
menu.classList.add('hidden');
}
}
});
