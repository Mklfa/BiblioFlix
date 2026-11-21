const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

const APP_URL = "https://biblioflix.pages.dev/";
const allowedHosts = new Set(["biblioflix.pages.dev", "wa.me"]);

function isAllowedUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return allowedHosts.has(url.hostname);
  } catch {
    return false;
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 320,
    minHeight: 600,
    icon: path.join(__dirname, "public", "icons", "icon-512.png"),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: false,
    },
  });

  window.loadURL(APP_URL);

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedUrl(url)) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (url === APP_URL || url.startsWith(APP_URL)) {
      return;
    }
    event.preventDefault();
    if (isAllowedUrl(url)) {
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
