import { spawn } from "node:child_process";
import process from "node:process";
import path from "node:path";

const electronPath =
    process.platform === "win32"
        ? path.resolve("node_modules/electron/dist/electron.exe")
        : path.resolve("node_modules/electron/dist/electron");

const child = spawn(electronPath, ["."], {
    env: {
        ...process.env,
        VITE_DEV_SERVER_URL: "http://127.0.0.1:5173",
    },
    stdio: "inherit",
});

child.on("exit", (code) => {
    process.exit(code ?? 0);
});