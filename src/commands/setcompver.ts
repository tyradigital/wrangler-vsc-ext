import { QuickPickItem, window } from "vscode";
import { getConfig } from "../utils/config";
import Logger, { LogLevel } from "../utils/logger";

export async function execute(...args: any[]) {
  const config = getConfig();
  try {
    const choiceBox = await window.showQuickPick<QuickPickItem>(
      [
        {
          label: "Wrangler CLI 1",
          description:
            "The most common, and LTS stable version of the Wrangler CLI",
          detail: "1",
          picked: true,
        },
        {
          label: "Wrangler CLI 2",
          description: "The newer version of the Wrangler CLI; in development",
          detail: "2",
        },
      ],
      {
        title: "Wrangler",
        matchOnDescription: true,
        matchOnDetail: true,
      }
    );

    config.update("compver", parseInt(choiceBox?.detail || "1"));

    window.showInformationMessage(
      `Set Wrangler Compatability Version for the Wrangler Extension for this workspace to Wrangler CLI Version ${choiceBox?.detail}`
    );
  } catch (error) {
    Logger.log(LogLevel.error, error as Error);
    window.showErrorMessage("Unable to update workspace configuration");
  }
}
