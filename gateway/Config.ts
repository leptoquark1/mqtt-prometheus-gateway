import { parse } from "yaml"
import { resolve } from "path"
import { constants, access, readFile } from "fs/promises"
import { Configuration } from "./types"

const defaultPath = resolve( "/etc", "mqtt-prometheus-gateway", "config.yaml");
const fallbackPath = resolve(__dirname, "..", "config.yaml");

export default async function readConfig(configFile?: string) {

  if (!configFile) {
    try {
      await access(defaultPath, constants.R_OK);
      configFile = defaultPath;
    } catch {
      configFile = fallbackPath;
    }
  }

  return parse((await readFile(configFile)).toString()) as Configuration
}
