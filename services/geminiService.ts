import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

// Safely get API key
const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

// Initialize only if key exists, otherwise app handles fallback gracefully
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  if (!ai) {
    // If no API key, return a simulation message or error (useful for dev/preview without keys)
    return "מערכת ה-AI אינה מחוברת כרגע (חסר מפתח API). אך אני כאן כדי לעזור - אנא פנה לשגיא ישירות בוואצאפ!";
  }

  try {
    const model = "gemini-2.5-flash";
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    
    return result.text || "לא הצלחתי להבין, נסה לנסח שוב.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "נתקלתי בבעיה טכנית רגעית. נסה שוב בעוד כמה רגעים.";
  }
};