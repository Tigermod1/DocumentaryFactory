import { scanAssets } from "./scanner.js";

export function buildAssetDatabase() {
    return scanAssets();
}