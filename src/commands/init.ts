import { window } from "vscode";
import { exec } from "child_process";
import Logger, { LogLevel } from "../utils/logger";
import { WranglerVersion } from "../utils/enums";
import { getTerminal } from "../utils/terminal";

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
      const name = await window.showInputBox({
        title: "Wrangler Init",
        prompt: "Do you want to supply a name?",
      });

      if (typeof name === "undefined") {
        return window.showInformationMessage("Cancelled Wrangler Init");
      }

      const options = await window.showInputBox({
        title: "Wrangler Init",
        prompt: "Do you want to supply any options? (Commandline '--' format)",
      });

      // Logger.log(LogLevel.debug, `${options}`);

      if (typeof options === "undefined") {
        return window.showInformationMessage("Cancelled Logging");
      } else {
        let term = getTerminal();
        term.show();

        if (
          (name === "" || name === " ") &&
          (options === "" || options === " ")
        ) {
          term.sendText("wrangler init");
        } else if (
          options === "" ||
          (options === " " && !(name === "" || name === " "))
        ) {
          term.sendText(`wrangler init ${name}`);
        } else {
          term.sendText(`wrangler init ${name} ${options}`);
        }

        window.showInformationMessage("Created wrangler.toml");
      }
    }
  });
}
