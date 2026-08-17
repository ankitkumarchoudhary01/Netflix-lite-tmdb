import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getMovieFromMood(mood) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `
        You are a movie recommendation engine.

        The user will provide a mood.

        Return exactly ONE movie title that matches the mood.

        Do not provide:
        - explanations
        - descriptions
        - bullet points
        - quotation marks
        - multiple movies

        Return only the movie title.

        User mood: ${mood} `,
  });

  return response.text.trim();
}
