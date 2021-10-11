export class Token {
  evaluatedToken: string;
  logicblock: string;
  attribute: string;
  modifier: string;
  parseAttribute(): string {
    //TODO: Modify regex to exclude modifiers
    return this.attribute = this.evaluatedToken.split(/[.]/)[1];
  }
  parseModifier(): string {
    return this.modifier = this.evaluatedToken.split(/(?=[+*-])/)[1];
  }
  parseLogicBlock(): string {
    return this.evaluatedToken.split(/(?=[+*-])|[.]/)[0];
  }

  constructor(evaluatedToken: string) {
    this.evaluatedToken = evaluatedToken;
    this.logicblock = this.parseLogicBlock();
    this.attribute = this.parseAttribute();
    this.modifier = this.parseModifier();
    // * Here we log the values we have extracted from the token
    console.log(this.attribute);
  }
}
