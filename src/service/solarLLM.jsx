import OpenAI from 'openai';

const upsage_api = import.meta.env.VITE_REACT_APP_UPSTAGE_API_KEY;
const openai = new OpenAI({
  apiKey: upsage_api, // Sử dụng biến môi trường từ .env
  baseURL: 'https://api.upstage.ai/v1/solar',
  dangerouslyAllowBrowser: true
});

export const chatCompletion = async (userInput, searchResults) => {
  try {
    const prompt = `
      You are an expert travel planner. Given the provided JSON data containing items categorized as hotels, restaurants, and attractions, please rank these items within each category optimally based on the user's input.

      User Input:

      ${userInput}

      Provided JSON:

      ${JSON.stringify(searchResults)}

      Output:

      Please provide a JSON response with the top-ranked items in each category. Ensure to keep all fields in each item. Select the top 3 hotels and a number of restaurants and attractions equal to the number of days specified by the user. Ensure the output is valid JSON.
    `;

    const chatCompletion = await openai.chat.completions.create({
      model: 'solar-1-mini-chat',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      stream: false
    });

    const response = chatCompletion.choices[0].message.content;
    // Ensure the response is JSON parseable
    const jsonResponse = JSON.parse(response);
    return jsonResponse;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};