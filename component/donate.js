// URL Google Apps Script Web App
const scriptURL = 'https://script.google.com/macros/s/AKfycbx5QIM9LIPO3H6yyp--tsjt3r9NGalthf5EWdz9uzfK1WUARxO2YwmGOW5t9RKlxw4C/exec';

 // Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(angka) {
const numberString = angka.replace(/[^,\d]/g, '').toString();
const split = numberString.split(',');
let sisa = split[0].length % 3;
let rupiah = split[0].substr(0, sisa);
const ribuan = split[0].substr(sisa).match(/\d{3}/g);

if (ribuan) {
const separator = sisa ? '.' : '';
rupiah += separator + ribuan.join('.');
}

return rupiah ? 'Rp ' + rupiah : '';
}

// Event listener untuk memformat input nominal saat pengguna mengetik
document.addEventListener("DOMContentLoaded", function() {
const nominalInput = document.getElementById("nominal");

nominalInput.addEventListener("input", function(e) {
let value = e.target.value.replace(/\D/g, "");
e.target.value = formatRupiah(value);
});
});

// SANITASI INPUT
function sanitizeInput(unsafeText) {
return unsafeText
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}

// Menangani pengiriman form
document.getElementById('donateForm').addEventListener('submit', function(e) {
e.preventDefault();
const form = e.target;
const btnDonate = document.querySelector(".donation-button");
const waitingInfo = document.getElementById("waiting-process");
const name = sanitizeInput(document.getElementById("name").value);
const whatsapp = sanitizeInput(document.getElementById("whatsapp").value);
const method = sanitizeInput(document.querySelector('input[name="method"]:checked').value);
const nominal = sanitizeInput(document.getElementById("nominal").value);
// Validasi input
if (!name || !whatsapp || !method || !nominal) {
alert("Harap isi semua data dengan lengkap.");
return;
}

// Menampilkan proses menunggu
btnDonate.style.display = "none";
waitingInfo.style.display = "block";

const formData = new FormData(form);
// Mengirim data ke Google Apps Script menggunakan fetch

fetch(scriptURL, { method: 'POST', body: formData })
.then(response => {
waitingInfo.style.display = "none";
btnDonate.style.display = "block";
window.location.href = '#info';

// Menampilkan pesan konfirmasi
document.getElementById("info").innerHTML = `
Terima kasih, <b>${name}</b>!<br>
Anda telah berdonasi sebesar <b>${formatRupiah(nominal)}</b> melalui <b>${method}</b>.<br>
Silakan transfer ke nomor rekening berikut: <div class="bankid"><p id="rek">${method === "BCA" ? "8465779027" : "081229706872"}</p><button onclick="salinTeks()"><svg class="line" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="none" stroke="currentColor">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
</svg></button></div>
`;
document.getElementById("info").style.display = "block";
form.reset();
})
.catch(error => {
console.error('Error:', error);
alert("Gagal mengirim donasi. Coba lagi nanti.");
waitingInfo.style.display = "none";
btnDonate.style.display = "block";
});
});

// Fungsi untuk menyalin nomor rekening ke clipboard
function salinTeks() {
const rekening = document.getElementById("rek").textContent;
navigator.clipboard.writeText(rekening).then(() => {
alert("Nomor rekening berhasil disalin: " + rekening);
}).catch(err => {
alert("Gagal menyalin teks: " + err);
});
}
