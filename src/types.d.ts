import { EventEmitter, Terminal } from "vscode";

interface WranglerTerminal extends Terminal {
  /**
   * The write event emitter
   */
  writeEventEmitter: EventEmitter<string>;

  /**
   * The close event emitter
   */
  closeEventEmitter: EventEmitter<void>;
}
