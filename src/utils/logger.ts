import dayjs from "dayjs";
import { outChannel } from "../extension";
export const enum LogLevel {
  log = "LOG",
  info = "INFO",
  debug = "DEBUG",
  warn = "WARN",
  error = "ERROR",
}

export default class Logger {
  private static _log(level: LogLevel, message: string) {
    outChannel.appendLine(
      `[WRANGLER | ${level}] -- ${dayjs().format(
        "DD/MM/YYYY HH:mm:ss"
      )}   ${message}`
    );
  }

  public static log(
    level: LogLevel,
    message: string | Error,
    context?: string
  ) {
    if (typeof message === "string") {
      this._log(level, context ? `[${context}] ${message}` : message);
    } else if (message instanceof Error) {
      this._log(
        LogLevel.error,
        context ? `[${context}] ${message}` : message.message
      );
    }
  }
}
