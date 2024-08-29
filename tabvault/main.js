const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "TabVault",
    width: isDev ? 1000 : 500,
    height: 600,
  });

  // Implement Main Menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Open devtools if in dev
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: () => console.log("About was clicked"),
            },
            {
              label: "Quit TabVault",
              click: () => app.quit(),
              accelerator: isMac ? "Cmd+Q" : "Ctrl+W",
            },
          ],
        },
      ]
    : []),
  {
    label: "File",
    submenu: [],
  },
  // {
  //   role: "fileMenu",
  // },
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
