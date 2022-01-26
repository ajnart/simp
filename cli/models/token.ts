export class Token {
  logicblock: string;
  attribute: string[];
  modifier: string;

  parseLogicBlock(evaluatedToken: string): string {
    return evaluatedToken.split(/(?=[+*-])|[.]/)[0];
  }
  parseModifier(evaluatedToken: string): string {
    return evaluatedToken.split(/(?=[+*-])/)[1];
  }
  parseAttribute(evaluatedToken: string): string[] {
    const evaluated = evaluatedToken.split(/\.(.*)/)[1];
    if (evaluated != undefined) {
      return evaluated.split(/(?=[+*-])/).slice(0, 1)[0].split(".");
    }
    return [];
    // return [];
  }

  constructor(evaluatedToken: string) {
    this.logicblock = this.parseLogicBlock(evaluatedToken);
    this.attribute = this.parseAttribute(evaluatedToken);
    this.modifier = this.parseModifier(evaluatedToken);
  }
}
