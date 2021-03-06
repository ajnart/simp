import { ensureFileSync } from "https://deno.land/std/fs/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";

export abstract class Loader {
  static CONFIG_LOCATION = `${Deno.env.get("HOME")}/.config/simp/config.json`;

  // Functions that gets the value of an item from the config file.
  static getItem(key: string): string {
    // Check if config file exists. If it doen't, we create it.
    ensureFileSync(this.CONFIG_LOCATION);

    let config = JSON.parse("{}");
    try {
      config = JSON.parse(Deno.readTextFileSync(
        this.CONFIG_LOCATION,
      ));
    } catch (_) {
      log.debug("Config file was not found so JSON.parse failed for it.");
    }
    log.debug(`config file contains:\n${JSON.stringify(config, null, 4)}`);
    return config[key];
  }

  static getConfigItems(...items: string[]) {
    return items.map(
      (item: string): string => this.getItem(item),
    );
  }

  static setConfig(config: Record<string, unknown>): void {
    ensureFileSync(this.CONFIG_LOCATION);
    Deno.writeTextFileSync(
      this.CONFIG_LOCATION,
      JSON.stringify(config, null, 4),
    );
  }

  static setItem(key: string, value: string): void {
    // Check if config file exists. If it doen't, we create it.
    ensureFileSync(this.CONFIG_LOCATION);
    let config = JSON.parse("{}");
    try {
      config = JSON.parse(Deno.readTextFileSync(
        this.CONFIG_LOCATION,
      ));
    } catch (_) {
      log.debug("Config file was not found so JSON.parse failed for it.");
    }
    config[key] = value;
    Deno.writeTextFileSync(
      this.CONFIG_LOCATION,
      JSON.stringify(config, null, 4),
    );
  }
}
