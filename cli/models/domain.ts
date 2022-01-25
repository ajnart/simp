export class Domain {
  extension: string;
  name: string;
  firstLetter: string;
  lastLetter: string;
  constructor(url: string) {
    [this.extension, this.name, this.firstLetter, this.lastLetter] = this
      .parseDomain(url);
  }
  parseDomain(url: string): [string, string, string, string] {
    const domain = url.match(
      /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/,
    )?.at(1);
    console.log(domain);
    return ["", "", "", ""];
  }
}
