import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: In a real environment, ensure process.env.API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSupportiveAdvice = async (
  diaryText: string, 
  mood: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      You are a kind, empathetic, and supportive school counselor AI for elementary/middle school students in Thailand.
      
      Context:
      The student is feeling: ${mood}
      The student wrote in their diary: "${diaryText}"

      Task:
      Provide a very short, warm, and encouraging response (max 2 sentences) in the Thai language. 
      Validate their feelings and offer a tiny bit of hope or advice.
      Do not be overly clinical; be like a supportive older sibling or favorite teacher.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "ขอโทษนะจ๊ะ ครู AI ไม่สามารถตอบกลับได้ในขณะนี้ (Error generating text)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ระบบ AI กำลังพักผ่อน พยายามใหม่อีกครั้งนะจ๊ะ";
  }
};