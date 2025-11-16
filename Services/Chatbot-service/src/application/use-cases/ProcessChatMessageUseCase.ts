import { ContentModerationService } from "../../domain/services/ContentModerationService";
import { ChatbotDomainService } from "../../domain/services/ChatbotDomainService";
import { OllamaProvider } from "../../infrastructure/ollama/OllamaProvider";

// DTO de entrada
interface ChatMessageRequestDto {
  userId: string;
  message: string;
}

// Respuesta estándar
interface ChatResponseDto {
  reply: string;
  source: "knowledge_base" | "ollama" | "moderation";
  reason?: string;
  detectedTopic?: string | null;
}

export class ProcessChatMessageUseCase {
  private moderationService = new ContentModerationService();
  private knowledgeBase = new ChatbotDomainService();
  private ollama = new OllamaProvider();

  async execute({ userId, message }: ChatMessageRequestDto): Promise<ChatResponseDto> {
    // 1️⃣ Moderación previa antes de procesar
    const violation = this.moderationService.detectViolation(message);

    if (violation) {
      return {
        reply: "Solo puedo ayudarte con temas de educación y salud sexual. No puedo responder esa solicitud.",
        source: "moderation",
        reason: violation
      };
    }

    // 2️⃣ Intentar encontrar respuesta en la base de conocimiento
    const {
      reply: kbReply,
      topic
    } = this.knowledgeBase.getResponseFromKnowledgeBase(message);

    if (kbReply) {
      return {
        reply: kbReply,
        source: "knowledge_base",
        detectedTopic: topic
      };
    }

    // 3️⃣ Si no existe respuesta en la knowledge base, usar IA local (Ollama)
    const aiReply = await this.ollama.ask(message);

    return {
      reply: aiReply,
      source: "ollama",
      detectedTopic: topic ?? "unknown"
    };
  }
}
