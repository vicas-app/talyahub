import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// NOTE: process.env.API_KEY is assumed to be available and valid as per guidelines.
// It is handled externally.

let chatSession: Chat | null = null;

export const initializeChat = async (history: ChatMessage[]) => {
  // Directly use the API key from process.env as required by guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Transform app history to Gemini format if needed, 
  // but for fresh session we usually start clean or pass history in `history` prop of create
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are a warm, compassionate, and biblically knowledgeable AI prayer companion and spiritual guide for the TalyaHub church app. Your name is 'Talya Assistant'. Keep responses encouraging, relatively brief (under 150 words unless asked for more), and supportive. Use emojis occasionally to be friendly. If someone asks for prayer, write a short prayer for them.",
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // try to init
    await initializeChat([]);
  }
  
  // If still no session, something went wrong (should be rare with valid env key)
  if (!chatSession) return "I'm sorry, I'm having trouble connecting right now.";

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: message
    });
    return response.text || "I didn't catch that. Could you say it again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a moment of silence (error connecting). Please try again later.";
  }
};