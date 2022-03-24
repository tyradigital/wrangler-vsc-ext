// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// COMMAND IMPORTS
import { execute as tailExec } from "./commands/tail";
import { execute as enableExec } from "./commands/enable";
import { execute as disableExec } from "./commands/disable";
import { execute as setCompVerExec } from "./commands/setcompver";
import { execute as generateExec } from "./commands/generate";
import { execute as initExec } from "./commands/init";

// OTHER IMPORTS
import Logger, { LogLevel } from "./utils/logger";
import { getConfig } from "./utils/config";
import { WranglerVersion } from "./utils/enums";
import { disposeTerminal, getTerminal } from "./utils/terminal";

export const outChannel = vscode.window.createOutputChannel("Wrangler Ext");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  Logger.log(LogLevel.info, "Wrangler Extension is online!");

  const config = getConfig();

  const validate = (func: Function, ...args: any[]) => {
    if (config.get("enabled") === false) {
      return vscode.window.showWarningMessage(
        "The Wrangler Extension is disabled for this workspace\n \nEnable it using the enable command"
      );
    } else {
      let compver: WranglerVersion = 1;

      switch (config.get("compver") as WranglerVersion) {
        case 1:
          compver = 1;
          break;
        case 2:
          compver = 2;
          break;
        default:
          compver = 1;
          break;
      }

      return func(compver, ...args);
    }
  };

  const enableCommand = vscode.commands.registerCommand(
    "wrangler.enable",
    enableExec
  );

  const disableCommand = vscode.commands.registerCommand(
    "wrangler.disable",
    disableExec
  );

  const setCompVerCommand = vscode.commands.registerCommand(
    "wrangler.setcompver",
    setCompVerExec
  );

  const tailCommand = vscode.commands.registerCommand(
    "wrangler.tail",
    (...args: any[]) => validate(tailExec, ...args)
  );

  const generateCommand = vscode.commands.registerCommand(
    "wrangler.generate",
    (...args: any[]) => validate(generateExec, ...args)
  );

  const initCommand = vscode.commands.registerCommand(
    "wrangler.init",
    initExec
  );

  context.subscriptions.push(
    enableCommand,
    disableCommand,
    setCompVerCommand,
    tailCommand,
    generateCommand,
    initCommand
  );
}

// this method is called when your extension is deactivated
export function deactivate() {
  disposeTerminal();
}
