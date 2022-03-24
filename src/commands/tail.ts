import { Terminal, window } from "vscode";
import { exec } from "child_process";
import Logger, { LogLevel } from "../utils/logger";
import { WranglerVersion } from "../utils/enums";

export async function execute(compver: WranglerVersion, ...args: []) {
  const ex = exec("wrangler", async (error, stdout, stderr) => {
    // Logger.log(LogLevel.debug, error!.message.toString());
    // Logger.log(LogLevel.debug, stderr);
    // Logger.log(LogLevel.debug, stdout);

    if (
      error?.message.includes("not recognized") ||
      stderr.includes("not recognized")
    ) {
      return window.showErrorMessage(
        "Can't find wrangler to execute, do you have it installed?"
      );
    } else {
      const options = await window.showInputBox({
        title: "Wrangler Tail",
        prompt: "Do you want to supply any options? (Commandline '--' format)",
      });

      // Logger.log(LogLevel.debug, `${options}`);

      if (typeof options === "undefined") {
        return window.showInformationMessage("Cancelled Logging");
      } else {
        let term: Terminal = window.createTerminal("Wrangler Ext Terminal");
        term.show(true);

        if (options === "" || options === " ") {
          term.sendText("wrangler tail");
        } else {
          term.sendText(`wrangler tail ${options}`);
        }

        window.showInformationMessage("Started Logging");
      }
    }
  });
}
