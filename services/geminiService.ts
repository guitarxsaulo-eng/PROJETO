import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ebook } from '../types';

const ai = new GoogleGenerativeAI(process.env.API_KEY || '');

export const getChefRecommendation = async (userInput: string, availableEbooks: Ebook[]) => {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const systemInstruction = `Você é o Chef IA da Cozinha de Bolso. Seu objetivo é ajudar clientes a escolherem o ebook perfeito.
  
  Lista de Ebooks Disponíveis:
  ${availableEbooks.map(eb => `- ${eb.title} por ${eb.author}`).join('\n')}
  
  Diretrizes:
  1. Seja amigável e profissional.
  2. Recomende livros baseados no interesse do usuário.
  3. Responda em Português do Brasil.`;

  const result = await model.generateContent([systemInstruction, userInput]);
  return result.response.text();
};

export const chatWithChef = async (history: any[], availableEbooks: Ebook[]) => {
  const model = ai.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `Você é o Chef IA da Cozinha de Bolso. Ajude os clientes a encontrar receitas e ebooks. Ebooks disponíveis: ${availableEbooks.map(e => e.title).join(', ')}.`
  });

  const chat = model.startChat({ history });
  const lastMessage = history[history.length - 1].parts[0].text;
  
  const result = await chat.sendMessage(lastMessage);
  return result.response.text();
};