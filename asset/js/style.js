// WIDGET
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const mobile = document.getElementById('mobile');
const order = document.getElementById('order');

fetch('../navigation/header.html').then(function (snap) {
snap.text().then(function (result) {
if (header) {
header.innerHTML = result;
}
});
});
fetch('../navigation/footer.html').then(function (snap) {
snap.text().then(function (result) {
if (footer) {
footer.innerHTML = result;
}
});
});
fetch('../navigation/mobile.html').then(function (snap) {
snap.text().then(function (result) {
if (mobile) {
mobile.innerHTML = result;
}
});
});
fetch('../navigation/order.html').then(function (snap) {
snap.text().then(function (result) {
if (order) {
order.innerHTML = result;
}
});
});

// WEBSITE TAKEDOWN
var deadLine = new Date('2025-06-01');
var currentDate = new Date();
var timeDifference = deadLine - currentDate;

if (timeDifference <= 0) {
setTimeout(function () {
var popupElement = document.createElement('div');
popupElement.innerHTML = `
<div class="expired">
<div class="expired-content">
<h3>Pemberitahuan:</h3>
<p>Lisensi uji coba sudah habis, situs ini akan dialihkan ke pemilik lisensi (Azza Kreatif Digital Studio) karena melebihi batas waktu yang telah ditentukan. Meluncur dalam waktu <span id="countdown">10</span> detik.</p>
</div>
</div>`;
document.body.appendChild(popupElement);

var countdownElement = document.getElementById('countdown');
var countdownTime = 5;

var countdownInterval = setInterval(function () {
countdownTime--;
countdownElement.textContent = countdownTime;
if (countdownTime <= 0) {
clearInterval(countdownInterval);
window.location.href = 'https://www.instagram.com/azzabuza';
}
}, 1000);
}, 5000);
}

// ANTI KLIK KANAN
document.oncontextmenu = function (e) {
e.preventDefault();
alert("Dilarang klik kanan, yuk fokus belanja aja yuk");
return false;
}

// KUNCI TAMBAHAN
document.onkeydown = function (e) {

// ANTI F12
if (event.keyCode == 123) {
return false;
}

// ANTI CTRL+SHIFT+I
if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
return false;
}

// ANTI CTRL+SHIFT+C
if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
return false;
}

// ANTI CTRL+SHIFT+J
if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
return false;
}

// ANTI CTRL+SHIFT+U
if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
return false;
}
}

// ANTI SPAM
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let moveCount = parseInt(localStorage.getItem('moveCount')) || 0;
let suspended = JSON.parse(localStorage.getItem('suspended')) || false;
const maxRequests = 40;
const interval = 60000;

function saveState() {
localStorage.setItem('clickCount', clickCount);
localStorage.setItem('moveCount', moveCount);
localStorage.setItem('suspended', suspended);
}

setInterval(function() {
clickCount = 0;
saveState();
}, interval);

document.addEventListener('click', function (event) {
if (!suspended) {
clickCount++;
saveState();
if ((clickCount + moveCount) > maxRequests) {
event.preventDefault();
suspendUser();
}
} else {
event.preventDefault();
}
});

document.addEventListener('input', function (event) {
if (suspended) {
event.preventDefault();
}
});

document.addEventListener('keydown', function (event) {
if (suspended) {
event.preventDefault();
}
});

document.addEventListener('keypress', function (event) {
if (suspended) {
event.preventDefault();
}
});

document.addEventListener('mousedown', function (event) {
if (suspended) {
event.preventDefault();
}
});

document.addEventListener('touchstart', function (event) {
if (suspended) {
event.preventDefault();
}
});

function suspendUser() {
alert("Terlalu banyak permintaan dalam waktu singkat, kami mendeteksi adanya aktifitas mencurigakan. Anda ditangguhkan tidak dapat melakukan interaksi selama 10 detik setelah menutup popup peringatan ini. Jangan pernah mereload halaman ketika masa penangguhan belum selesai.");
suspended = true;
saveState();
setTimeout(function() {
suspended = false;
alert("Halaman normal kembali, penangguhan telah dicabut.");
clickCount = 0;
saveState();
}, 10000);
}

if (suspended) {
alert("Terlalu banyak permintaan dalam waktu singkat, kami mendeteksi adanya aktifitas mencurigakan. Anda ditangguhkan tidak dapat melakukan interaksi selama 10 detik setelah menutup popup peringatan ini. Jangan pernah mereload halaman ketika masa penangguhan belum selesai.");
setTimeout(function() {
suspended = false;
alert("Halaman normal kembali, penangguhan telah dicabut.");
clickCount = 0;
saveState();
}, 5000);
}
