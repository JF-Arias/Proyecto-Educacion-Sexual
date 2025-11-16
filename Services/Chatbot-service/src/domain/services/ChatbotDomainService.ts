import { knowledgeBase } from "../../infrastructure/knowledge";

interface KnowledgeTopic {
  topic: string;
  keywords: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export class ChatbotDomainService {
  /**
   * Busca la mejor coincidencia en la base de conocimiento por palabras clave
   * y devuelve una respuesta (si existe) y el topic detectado.
   */
  getResponseFromKnowledgeBase(message: string): { reply: string | null; topic: string | null } {
    const normalizedMessage = message.toLowerCase();

    let bestMatch: KnowledgeTopic | null = null;
    let highestScore = 0;

    for (const topicData of knowledgeBase as KnowledgeTopic[]) {
      let score = 0;

      for (const keyword of topicData.keywords) {
        if (normalizedMessage.includes(keyword.toLowerCase())) {
          score++;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = topicData;
      }
    }

    if (bestMatch && bestMatch.faqs.length > 0) {
      // Por ahora usamos la primera FAQ del tema que mejor coincide
      return {
        reply: bestMatch.faqs[0].answer,
        topic: bestMatch.topic
      };
    }

    return {
      reply: null,
      topic: null
    };
  }
}
