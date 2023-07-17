import { Configuration, OpenAIApi } from "openai";
import  api  from "../utils/openai";

export const getChatResponse = async (message: string) => {
  const response = await api.getChatResponse(message);
  return response;
};
