import { CustomError } from "ts-custom-error";

export interface Details {
  details(): Record<string, unknown>;
}

export abstract class DomainError extends CustomError implements Details {
  abstract details(): Record<string, unknown>;
}

