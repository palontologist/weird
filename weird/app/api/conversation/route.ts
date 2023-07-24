import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration ({
    apikey: process.env.OPENAI_API,
});

const openai = new OpenAIApi (configuration);

export async function POST (
    req: Request
){
    try{
     const body = await req.json();
     const { messages } = body;
     if (!Configuration.apikey) {
        return new NextResponse ("OpenAI API Key not configured", {status:500});
     }
        if (!messages) {
            return new NextResponse ("Messages are Required", {status: 400});
     }
     const response = await openai.createChatCompletion ({
        model:"gpt-3.5-turbo",
        messages
     });

     return NextResponse.json(response.data.choices[0].message);
   

    } catch (error) { 
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse ( "Internal error", { status:500 });
    }
    
};