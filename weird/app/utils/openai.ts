import { OpenAIApi } from "openai";

const {Configuration, OpenaiApi } = require ("openai");

const configuration = new Configuration ({
    apiKey:process.env.OPENAI_API_KEY,

});
const openai = new OpenAIApi(configuration);

export default openai