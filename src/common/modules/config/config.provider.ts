import { Injectable } from "@nestjs/common";
import * as dotenvSafe from "dotenv-safe";

import { ConfigService } from "./config.service";

@Injectable()
export class ConfigProvider extends ConfigService {
  private readonly dotenvValues: Record<string, string>;

  constructor() {
    super();
    const envFilePath = this.getDotenvFileName();

    if (!envFilePath) {
      this.dotenvValues = {};
      return;
    }

    const envParsingResult = dotenvSafe.config({
      allowEmptyValues: true,
      path: envFilePath,
    });

    if (envParsingResult.error) {
      throw envParsingResult.error;
    }

    this.dotenvValues = envParsingResult.parsed ?? {};
  }

  /**
   * Looks for a value associated to `key` in `process.env` first,
   * and in dotenv file next.
   *
   * @param key Key to look a value for.
   *
   * @throws {Error} If the given configuration `key` is not found (process.env or dotenv file).
   *
   * @return The value (as a string, no matter the value) associated to the given `key`.
   */
  get(key: string): string | undefined {
    if (key in process.env) {
      return process.env[key];
    }

    if (key in this.dotenvValues) {
      return this.dotenvValues[key];
    }

    throw new Error(`Configuration key ${key} not found`);
  }

  getUrl(key: string): string | undefined {
    const url = this.get(key);
    if (!url) {
      return;
    }
    if (!url.startsWith("http")) {
      return `https://${url}`;
    }
    if (url.endsWith("/")) {
      return url.slice(0, url.length - 1);
    }
    return url;
  }

  getBoolean(key: string): boolean {
    const stringValue = this.get(key);
    if (stringValue === "true") {
      return true;
    }
    return false;
  }

  getNumber(key: string): number | undefined {
    const stringValue = this.get(key);
    if (!stringValue) {
      return;
    }

    const numberValue = Number(stringValue);
    if (Number.isNaN(numberValue)) {
      throw new Error(`Configuration key ${key} is not a number`);
    }

    return numberValue;
  }

  getDotenvFileName() {
    if (process.env["CI"] === "true") {
      return ".env.ci";
    }

    if (process.env["NODE_ENV"] === "production") {
      return undefined;
    }

    return `.env.${process.env["NODE_ENV"] || "development"}`;
  }

  isDevelopment(): boolean {
    return this.get("NODE_ENV") === "development";
  }
}
