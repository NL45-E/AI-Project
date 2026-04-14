export async function telegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const myChatId = process.env.MY_TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: myChatId,
      text: message,
    }),
  });
  const data = await response.json();
  return data;

  } catch (error) {
    console.error(error);
    return null
  }
};
