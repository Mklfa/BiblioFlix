if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Impossible d'activer le mode hors ligne de BiblioFlix.", error);
    });
  });
}
