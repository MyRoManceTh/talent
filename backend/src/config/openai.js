const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OPENAI_CONFIG = {
  model: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: 0.7,
  maxTokens: 2000,
};

module.exports = {
  openai,
  OPENAI_CONFIG,
};
