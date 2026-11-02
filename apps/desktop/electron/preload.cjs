
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("aether", {
  getAppName: () => "Aether",

  openTarget: (target) =>
    ipcRenderer.invoke("aether:open-target", target),

  startDSA: () =>
    ipcRenderer.invoke("aether:start-dsa"),
});
