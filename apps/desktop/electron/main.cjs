
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");
const { spawn } = require("node:child_process");

const URLS = {
  leetcode: "https://leetcode.com",
  chatgpt: "https://chatgpt.com",
};

function openVSCode() {
  return new Promise((resolve) => {
    const process = spawn("code", [], {
      detached: true,
      stdio: "ignore",
      shell: false,
    });

    process.once("error", () => {
      resolve({
        success: false,
        message: "VS Code launch nahi hua. Check karo ki 'code' PATH mein available hai.",
      });
    });

    process.once("spawn", () => {
      process.unref();
      resolve({ success: true, message: "VS Code opened." });
    });
  });
}

ipcMain.handle("aether:open-target", async (_event, target) => {
  if (target === "vscode") {
    return openVSCode();
  }

  if (target === "leetcode" || target === "chatgpt") {
    try {
      await shell.openExternal(URLS[target]);
      return { success: true, message: `${target} opened in browser.` };
    } catch {
      return { success: false, message: `Could not open ${target}.` };
    }
  }

  return { success: false, message: "Action not allowed." };
});

ipcMain.handle("aether:start-dsa", async () => {
  const vscode = await openVSCode();

  const results = await Promise.all(
    ["leetcode", "chatgpt"].map(async (target) => {
      try {
        await shell.openExternal(URLS[target]);
        return true;
      } catch {
        return false;
      }
    })
  );

  const successCount = results.filter(Boolean).length;

  return {
    success: vscode.success && successCount === 2,
    message: `DSA setup: VS Code ${vscode.success ? "opened" : "failed"}, browser links ${successCount}/2 opened.`,
  };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 800,
    minHeight: 600,
    title: "Aether",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL;

  if (devUrl) {
    win.loadURL(devUrl);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
