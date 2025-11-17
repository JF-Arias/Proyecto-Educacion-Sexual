export class ContentModerationService {
  private forbiddenPatterns = [
    /hacke(ar|o)/i,
    /matar|asesinar|viol(ar|ación)/i,
    /droga|fabricar droga|cocaína|meta(mfetamina)?/i,
    /arma|pistola|explosivo/i,
    /secuestro|extorsión/i,
    /porn(o|ografía)|explícit(o|a)/i
  ];

  private allowedSexualEducationPatterns = [
    /sexual/i,
    /sexo seguro/i,
    /consentimiento/i,
    /anticonceptivo/i,
    /vph|its|vih/i,
    /relación(es)? sana(s)?/i,
    /embarazo/i,
    /menstruación|ciclo menstrual/i,
    /orientación sexual|identidad de género/i
  ];

  detectViolation(message: string): string | null {
    if (this.forbiddenPatterns.some(p => p.test(message))) {
      return "forbidden_content";
    }

    const isSexualEducation = this.allowedSexualEducationPatterns.some(p => p.test(message));
    if (!isSexualEducation) {
      return "topic_not_allowed";
    }

    return null;
  }
}
