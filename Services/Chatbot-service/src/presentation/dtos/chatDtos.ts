export interface ChatRequestDTO {
  userId: string;
  message: string;
  topic?: string;
}

export interface ChatResponseDTO {
  reply: string;
  source: "knowledge_base" | "openai";
  detectedTopic: string;
}
