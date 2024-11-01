export const config = {
  telegram: {
    apiToken: process.env.TELEGRAM_API_TOKEN || 'YOUR_BOT_TOKEN',
    channels: [
      '@vst_plugins',
      '@audio_plugins'
    ]
  },
  rutracker: {
    username: process.env.RUTRACKER_USERNAME || 'YOUR_USERNAME',
    password: process.env.RUTRACKER_PASSWORD || 'YOUR_PASSWORD'
  }
};