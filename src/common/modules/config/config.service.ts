export abstract class ConfigService {
  abstract get(key: string): string | undefined;

  abstract getUrl(key: string): string | undefined;

  abstract getBoolean(key: string): boolean;

  abstract getNumber(key: string): number | undefined;

  abstract isDevelopment(): boolean;
}
