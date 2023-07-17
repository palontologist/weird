import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export const getChatResponse = async (message: string) => {
  const response = await openai.engine.createCompletion(
    {
      prompt: message,
      temperature: 0.7,
      maxTokens: 100,
    },
  );

  return response.choices[0].text;
};