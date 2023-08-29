import { NextResponse } from "next/server";
import {  Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
  
  const openai = new OpenAIApi(configuration);
  const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: "You are an SDG assistant suggest the SDGs one can impact most using their education,skills and passions."
};

export async function POST (
    req: Request
) {
    try{
     const body = await req.json();
     const { messages } = body;

    
        if (!messages) {
            return new NextResponse ("Messages are Required", {status: 400});
     }
     const response = await openai.createChatCompletion ({
        model:"gpt-3.5-turbo",
        messages: [instructionMessage, ...messages]
     });

     return NextResponse.json(response.data.choices[0].message);
   

    } catch (error) { 
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse ( "Internal error", { status:500 });
    }
     
};
