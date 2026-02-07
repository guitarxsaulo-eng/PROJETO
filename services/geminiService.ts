
import { GoogleGenAI } from "@google/genai";
import { Ebook } from '../types';

// Always use named parameter for apiKey and obtain it exclusively from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefRecommendation = async (userInput: string, availableEbooks: Ebook[]) => {
  // Use ai.models.generateContent to query GenAI with both the model name and prompt.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userInput,
    config: {
      systemInstruction: `
        Você é o "Chef IA" da loja Sabor & Saber. Seu objetivo é ajudar clientes a escolherem o ebook de culinária ideal.
        
        Lista de Ebooks Disponíveis:
        ${availableEbooks.map(eb => `- ${eb.title} por ${eb.author} (Categoria: ${eb.category}, R$ ${eb.price})`).join('\n')}
        
        Diretrizes:
        1. Seja amigável, entusiasmado e profissional.
        2. Recomende livros específicos baseados no interesse do usuário.
        3. Se o usuário estiver indeciso, faça perguntas sobre o que ele gosta de comer ou seu nível de habilidade.
        4. Responda em Português do Brasil.
        5. Mantenha as respostas concisas e úteis.
      `,
    },
  });

  // Access the text property directly (not a method).
  return response.text;
};

export const chatWithChef = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], availableEbooks: Ebook[]) => {
  // Creating a chat session with history and system instruction.
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    // Pass the history to the chat session.
    history: history.slice(0, -1),
    config: {
      systemInstruction: `Você é o Chef IA da Sabor & Saber. Ajude os clientes a encontrar receitas e ebooks. Ebooks disponíveis: ${availableEbooks.map(e => e.title).join(', ')}.`,
    }
  });

  const lastMessage = history[history.length - 1].parts[0].text;
  
  // sendMessage only accepts the message parameter.
  const response = await chat.sendMessage({ message: lastMessage });
  return response.text;
};
