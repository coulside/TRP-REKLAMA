export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('OK', { status: 200 });
    }

    try {
      const payload = await request.json();
      if (payload.message && payload.message.text) {
        const chatId = payload.message.chat.id;
        const text = `Echo: ${payload.message.text}`;
        
        const telegramUrl = `https://api.telegram.org/bot${env.ENV_BOT_TOKEN}/sendMessage`;
        await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: text })
        });
      }
    } catch (e) {
      console.error(e);
    }

    return new Response('OK', { status: 200 });
  }
};