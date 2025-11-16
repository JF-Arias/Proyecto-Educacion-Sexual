import { Request, Response } from "express";
import { ProcessChatMessageUseCase } from "../../../application/use-cases/ProcessChatMessageUseCase";

const processChatMessageUseCase = new ProcessChatMessageUseCase();

export const chatController = {
  handleChatMessage: async (req: Request, res: Response) => {
    const { userId, message, topic } = req.body;

    if (!userId || !message) {
      return res.status(400).json({
        error: "userId and message are required"
      });
    }

    const response = await processChatMessageUseCase.execute({
      userId,
      message,
    });

    return res.json(response);
  },

  getTopics: async (_req: Request, res: Response) => {
    return res.json({
      topics: [
        { id: "general", name: "Salud sexual general" },
        { id: "contraception", name: "Métodos anticonceptivos" },
        { id: "its", name: "Infecciones de transmisión sexual (ITS)" },
        { id: "pregnancy", name: "Embarazo" },
        { id: "menstrual", name: "Salud menstrual" },
        { id: "relationships", name: "Relaciones y afectividad" }
      ]
    });
  }
};
