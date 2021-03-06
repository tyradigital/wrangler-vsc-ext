import { window } from "vscode";
import { getConfig } from "../utils/config";
import { WranglerVersion } from "../utils/enums";
import Logger, { LogLevel } from "../utils/logger";

export async function execute(compver: WranglerVersion, update = true) {
  const config = getConfig();
  try {
    if (update) {
      await config.update("enabled", true);
    }

    window.showInformationMessage(
      "Enabled Wrangler Extension for this workspace"
    );
  } catch (error) {
    Logger.log(LogLevel.error, error as Error);
    window.showErrorMessage("Unable to update workspace configuration");
  }
}
