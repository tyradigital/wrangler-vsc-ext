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
      const name = await window.showInputBox({
        title: "Wrangler Generate",
        prompt: "What do you want to name this wrangler project?",
      });

      if (typeof name === "undefined") {
        return window.showInformationMessage(
          "Cancelled Wrangler Project Generator"
        );
      }

      const template = await window.showInputBox({
        title: "Wrangler Generate",
        prompt: "Do you want to use a template? If so, supply the url",
      });

      if (typeof template === "undefined") {
        return window.showInformationMessage(
          "Cancelled Wrangler Project Generator"
        );
      }

      const options = await window.showInputBox({
        title: "Wrangler Generate",
        prompt:
          "Finally, do you want to supply any options? (Commandline '--' format)",
      });

      if (typeof options === "undefined") {
        return window.showInformationMessage(
          "Cancelled Wrangler Project Generator"
        );
      } else {
        let term: Terminal = window.createTerminal("Wrangler Ext Terminal");
        term.show(true);

        if (
          !(name === "" || options === " ") &&
          !(options === "" || options === " ")
        ) {
          term.sendText(`wrangler generate ${name}`);
        } else if (options === "" || options === " ") {
          term.sendText(`wrangler generate ${name} ${template}`);
        } else {
          term.sendText(`wrangler generate ${name} ${template} ${options}`);
        }

        Logger.log(LogLevel.info, "Generated NEW Wrangler Project");
        window.showInformationMessage("Generating new Wrangler Project...");
      }
    }
  });
}
