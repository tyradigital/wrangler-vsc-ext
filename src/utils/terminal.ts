import {
  EventEmitter,
  ExtensionTerminalOptions,
  Pseudoterminal,
  Terminal,
  window,
} from "vscode";
import { WranglerTerminal } from "../types";

let terminal: WranglerTerminal | Terminal;

const writeEmitter = new EventEmitter<string>();
const closeEmitter = new EventEmitter<void>();

const pty: Pseudoterminal = {
  onDidWrite: writeEmitter.event,
  onDidClose: closeEmitter.event,
  open: () => {},
  close: () => {},
  handleInput: (data) => {
    console.log(data);
  },
};

const makeTerminal = (usePty = true): WranglerTerminal => {
  terminal?.dispose();
  const termExists = window.terminals.find((t) => t.name === "Wrangler Ext.");
  if (termExists) {
    return termExists as WranglerTerminal;
  }

  if (usePty) {
    terminal = window.createTerminal({
      name: "Wrangler Ext.",
      pty: pty,
    } as ExtensionTerminalOptions);
  } else {
    terminal = window.createTerminal({
      name: "Wrangler Ext.",
    } as ExtensionTerminalOptions);
  }

  (terminal as WranglerTerminal).writeEventEmitter = writeEmitter;
  (terminal as WranglerTerminal).closeEventEmitter = closeEmitter;
  return terminal as WranglerTerminal;
};

export function getTerminal(): WranglerTerminal {
  if (!terminal) {
    return makeTerminal(false);
  } else {
    return terminal as WranglerTerminal;
  }
}

export const disposeTerminal = (term = terminal): WranglerTerminal => {
  term?.dispose();
  return term as WranglerTerminal;
};
