// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const { Worker } = require("worker_threads");
const path = require("path");
let services = {};

function createService(name) {
	services[name] = new Worker("./" + name + ".js");
	services[name].on("error", e =>
		console.warn("Cannot start network relay module", e)
	);
}
function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: false,
		titleBarStyle: "hidden",
		titleBarOverlay: {
			color: "#000000",
			symbolColor: "#74b1be",
			height: 20,
		},
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
			nodeIntegrationInWorker: true,
			contextIsolation: false,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile("index.html");
	mainWindow.on("ready-to-show", mainWindow.maximize);
	mainWindow.setAutoHideMenuBar(true);
	createService("relay");
	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", async function () {
	if (services.savadata)
		require("fs").writeFileSync("./arch_state.bin.zst", services.savedata);
	if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("getSaveMGR", (e, save) => {
	services.savedata = save;
});
