
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { products } from './mockData';
import { Watchdog } from '../watchdog';

// Accessing environment variable safely
const API_KEY = process.env.API_KEY || '';

// System instruction that gives the AI context about the store
const SYSTEM_INSTRUCTION = `
You are the AI Product Expert for Tek Point, a high-end tech shop in Tehran selling flashlights, knives, and tactical gear.
You have access to the following product catalog knowledge:
${products.map(p => `- ${p.name} (${p.category}): $${p.price}. Specs: ${JSON.stringify(p.specs)}. Description: ${p.description.en}`).join('\n')}

Your goal is to help customers find the right gear.
- If asking about current events or general tech news, use Google Search.
- If asking about specific products in the catalog, use the catalog info.
- Be concise, professional, and helpful.
- For purchase inquiries, direct them to WhatsApp: +989122050669.
`;

class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    try {
      if (API_KEY) {
        this.ai = new GoogleGenAI({ apiKey: API_KEY });
      } else {
        Watchdog.warn("Gemini API Key missing. AI features will be disabled.");
      }
    } catch (e) {
      Watchdog.error("Failed to initialize Gemini Client");
    }
  }

  async chat(message: string, history: { role: 'user' | 'model', text: string }[]): Promise<{ text: string, sources?: any[] }> {
    if (!this.ai) {
      return { text: "AI Service is currently unavailable. Please contact support via WhatsApp." };
    }

    try {
      // Hybrid approach: Search intent detection
      const isSearchIntent = /search|news|latest|find|google/i.test(message);
      
      let response: GenerateContentResponse;
      let text = '';
      let sources = undefined;

      if (isSearchIntent) {
         response = await this.ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
            { role: 'user', parts: [{ text: message }] }
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ googleSearch: {} }],
          }
        });
        
        text = response.text || "I couldn't find anything.";
        sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        
      } else {
        // Standard Chat
        response = await this.ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: [
                ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
                { role: 'user', parts: [{ text: message }] }
            ],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION
            }
        });
        text = response.text || "I'm having trouble thinking right now.";
      }

      return { text, sources };

    } catch (error) {
      Watchdog.error(`Gemini API Error: ${error}`);
      return { text: "I'm having trouble connecting to the network right now. Please check your connection." };
    }
  }
}

export const geminiService = new GeminiService();
