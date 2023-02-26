/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer } = require("electron");
const { unlinkSync, existsSync } = require("fs");

let crashRP = e => {
	document.getElementById("verinfo").style.display = "block";
	document.getElementById("runtime_infos").style.display = "none";
	document.getElementById("loading").style.display = "block";
	document.getElementById("loading").textContent = e.stack ? e.stack : e;
	setTimeout(() => ipcRenderer.send("restart"), 5000);
};
window.onerror = (...obj) => {
	let e = obj[4];
	try {
		crashRP(e);
	} catch (a) {
		window.addEventListener("DOMContentLoaded", () => crashRP(e));
	}
};
window.addEventListener("unhandledrejection", event => {
	let e = event.reason;
	try {
		crashRP(e);
	} catch (a) {
		window.addEventListener("DOMContentLoaded", () => crashRP(e));
	}
});

var i = "";
setInterval(async () => {
	let save = await window.v86savemgr.pe();
	ipcRenderer.send("getSaveMGR", Buffer.from(save));
}, 2000);

window.addEventListener("DOMContentLoaded", () => {
	document.getElementById("fixboot").onclick = () => {
		unlinkSync("arch_state.bin.zst");
		console.log("Fixing boot...");
		ipcRenderer.send("restart");
	};
	let loading = document.getElementById("loading");
	if (!existsSync("./build/v86_all.js"))
		loading.textContent = "v86 library not found!";
	else if (!existsSync("./build/v86.wasm"))
		loading.textContent = "v86 library WASM not found";
	else if (!existsSync("./renderer.js"))
		loading.textContent = "Main renderer not found";
});
