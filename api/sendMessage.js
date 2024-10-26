export default async function handler(req, res) {
  const chatId = '6115365841';
  const botToken = '7577714116:AAFzyhoEGmn-xc8LAH9c_Dq5eu_YYIUwtNA';
  const message = 'Klik tombol di bawah untuk membuka website Bibitin';

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(telegramApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Buka Website', web_app: { url: 'https://bibitin.com' } }]
        ]
      }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
