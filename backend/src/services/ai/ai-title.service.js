import {ChatGroq} from "@langchain/groq";
import {SystemMessage, HumanMessage} from "langchain"
import {env} from '../../config/env.js';
import * as z from 'zod';


const model = new ChatGroq({
    model:"qwen/qwen3.8-27b",
    apiKey: env.GROQ_API_KEY,
});


const structureModel =  model.withStructuredOutput(z.object({
    title: z.string().min(1, {message: "Title cannot be empty"}).max(50, {message: "Title cannot be longer than 50 characters"}).describe("The title of the conversation, should be short and descriptive on the basic of user's message"),
}))

/**
 * @function generateTitle 
 * @param {string} message - The user's message for which to generate a title.
 * @returns {Promise<string>} - A promise that resolves to the generated title.
 */

export async function generateTitle(message){
    const systemMessage = new SystemMessage(`
        You are an AI assistant that generates a short and descriptive title for a conversation based on the user's message. 

        ## Follow these guidelines:
        - The title should be concise and relevant to the user's message.
        - The title should be no longer than 50 characters.
        - Avoid using generic titles; be specific to the content of the message.
        - Focus on the main topic or theme of the message when creating the title.
        `);

        const humanMessage = new HumanMessage(message);

        const response = await structureModel.invoke([systemMessage, humanMessage]);

        return response.title;

}