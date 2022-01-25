export class Token {
  logicblock: string;
  attribute: string;
  modifier: string;

  parseAttribute(evaluatedToken: string): string {
    return evaluatedToken.split(/\.(.*)[+*-]/)[1];
  }
  parseModifier(evaluatedToken: string): string {
    return evaluatedToken.split(/(?=[+*-])/)[1];
  }
  parseLogicBlock(evaluatedToken: string): string {
    return evaluatedToken.split(/(?=[+*-])|[.]/)[0];
  }

  constructor(evaluatedToken: string) {
    this.logicblock = this.parseLogicBlock(evaluatedToken);
    this.attribute = this.parseAttribute(evaluatedToken);
    this.modifier = this.parseModifier(evaluatedToken);
  }
}
