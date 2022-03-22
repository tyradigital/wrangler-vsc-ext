// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Logger, { LogLevel } from "./utils/logger";

// COMMAND IMPORTS
import { execute as tailExec } from "./commands/tail";
import { execute as enableExec } from "./commands/enable";
import { execute as disableExec } from "./commands/disable";
import { execute as setCompVerExec } from "./commands/setcompver";
import { execute as generateExec } from "./commands/generate";

export const outChannel = vscode.window.createOutputChannel("Wrangler Ext");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  Logger.log(LogLevel.info, "Wrangler Extension is online!");

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
    tailExec
  );

  const generateCommand = vscode.commands.registerCommand(
    "wrangler.generate",
    generateExec
  );

  context.subscriptions.push(
    enableCommand,
    disableCommand,
    setCompVerCommand,
    tailCommand,
    generateCommand
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
