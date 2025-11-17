export class OllamaProvider {
  async ask(message: string) {
    const prompt = `
Eres un asistente de educación y salud sexual para la plataforma EduSex.
Responde únicamente preguntas relacionadas con sexualidad, métodos anticonceptivos, ITS/ETS, embarazo,
consentimiento, relaciones afectivas y bienestar sexual.
No proporciones diagnósticos médicos ni instrucciones médicas específicas. 
Si la pregunta no pertenece a estos temas, responde: 
"Solo puedo ayudarte con temas de educación y salud sexual."

Pregunta del usuario:
${message}
`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        prompt: prompt,
        stream: false
      })
    });

    const data = await response.json();
    return data.response;
  }
}
