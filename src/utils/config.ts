import { workspace } from "vscode";

export function getConfig() {
  return workspace.getConfiguration("wrangler");
}
