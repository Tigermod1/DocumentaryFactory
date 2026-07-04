import { spawn, spawnSync } from 'node:child_process';
import process from 'node:process';

const electronBinary = 'node_modules/electron/dist/electron';
const ldd = process.platform === 'linux' ? spawnSync('ldd', [electronBinary], { encoding: 'utf8' }) : null;
const missingLibraries = ldd?.stdout?.includes('not found') ?? false;
const missingDisplay = process.platform === 'linux' && !process.env.DISPLAY && !process.env.WAYLAND_DISPLAY;

if (missingLibraries || missingDisplay) {
  if (missingLibraries) {
    console.warn('Electron launch skipped: required Linux desktop libraries are not installed in this environment.');
  }

  if (missingDisplay) {
    console.warn('Electron launch skipped: no DISPLAY or WAYLAND_DISPLAY is available in this environment.');
  }

  console.warn('Vite and Express remain available for foundation development. Install desktop runtime libraries and use a graphical session to launch Electron.');
  setInterval(() => undefined, 60_000);
} else {
  const child = spawn('node_modules/.bin/electron', ['.'], {
    env: {
      ...process.env,
      VITE_DEV_SERVER_URL: 'http://127.0.0.1:5173',
    },
    stdio: 'inherit',
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
    } else {
      process.exit(code ?? 0);
    }
  });
}
