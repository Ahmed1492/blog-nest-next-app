import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateBlogContent(prompt) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt + `\n\nGenerate a detailed blog with the following formatting:
1. Use numbered sections (1, 2, 3...) for the main ideas.
2. Inside each section, add bullet points (•).
3. Include headings and subheadings.
4. Write in long text format.
5. Do NOT return plain text.`,
  });
  return response.text;
}
