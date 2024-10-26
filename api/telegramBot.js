export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

console.log('Received message:', req.body);

if (!req.body || !req.body.message) {
return res.status(400).json({ error: 'No message provided' });
}

const chatId = req.body.message.chat.id;
const text = req.body.message.text;

const botToken = '7577714116:AAFzyhoEGmn-xc8LAH9c_Dq5eu_YYIUwtNA';

console.log('Chat ID:', chatId);
console.log('Text:', text);

if (text === '/start') {
const message = 'Penyedia bibit berkualitas unggul untuk perkebunan dan pertanian Indonesia. Klik tombol di bawah untuk membuka Mini App Bibitin';
const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

try {
const response = await fetch(telegramApiUrl, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
chat_id: chatId,
text: message,
reply_markup: {
inline_keyboard: [
[
{ text: 'Jalankan Bibitin App', web_app: { url: 'https://bibitin.com' } }
],
[
{ text: 'Tentang Kami', web_app: { url: 'https://www.bibitin.com/company/about.html' } },
{ text: 'Kontak Kami', web_app: { url: 'https://www.bibitin.com/info/contact.html' } },
],
[
{ text: 'Donasi Hebat', web_app: { url: 'https://www.bibitin.com/service/donate.html' } }
]
]
}
})
});

if (!response.ok) {
throw new Error(`Error: ${response.statusText}`);
}

const data = await response.json();
console.log('Message sent:', data);
return res.status(200).send('Message sent.');
} catch (error) {
console.error('Error sending message:', error);
return res.status(500).json({ error: 'Failed to send message' });
}
} else {
console.log('Command not recognized:', text);
return res.status(200).send('Command not recognized.');
}
}
