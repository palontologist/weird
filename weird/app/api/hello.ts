import openai from "@/utils/openai";
import type { NextApiRequest,NextApiResponse } from "next";
type Data = {
    name:string
}
export default async function handler (
    req:NextApiRequest,
    res:NextApiResponse<any>
) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:"Hello AGI I am 21givenchy do you know me"
    });
    const responseText = completion.data.choices[0].text;


    res.status(200).json({responseText});
}
