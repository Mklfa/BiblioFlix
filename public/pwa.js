const installPromptKey = "biblioflix-install-prompt-dismissed";
const isIosDevice = /iphone|ipad|ipod/i.test(navigator.userAgent)
  || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isInstalled = () => window.matchMedia("(display-mode: standalone)").matches
  || navigator.standalone === true;
const isWindowsDevice = /windows/i.test(navigator.userAgent)
  || navigator.platform?.toLowerCase().startsWith("win");
const windowsInstallerUrl = "https://github.com/Mklfa/BiblioFlix/releases/download/desktop-latest/BiblioFlix-Setup.exe";

const hasDismissedInstallPrompt = () => {
  try {
    return sessionStorage.getItem(installPromptKey) === "dismissed";
  } catch (error) {
    console.error("Impossible de mémoriser le choix d’installation de BiblioFlix.", error);
    return false;
  }
};

const rememberInstallPromptDismissal = () => {
  try {
    sessionStorage.setItem(installPromptKey, "dismissed");
  } catch (error) {
    console.error("Impossible de mémoriser la fermeture de la proposition d’installation.", error);
  }
};

let deferredInstallPrompt = null;
let showingInstallHelp = false;

const installBanner = document.createElement("aside");
installBanner.className = "pwa-install-banner";
installBanner.setAttribute("aria-label", "Installer BiblioFlix");
installBanner.setAttribute("role", "region");
installBanner.hidden = true;

const installCopy = document.createElement("div");
installCopy.className = "pwa-install-copy";

const installTitle = document.createElement("h2");
installTitle.textContent = "Installez BiblioFlix";

const installMessage = document.createElement("p");
installMessage.textContent = "Retrouvez facilement votre librairie depuis l’écran d’accueil.";
installCopy.append(installTitle, installMessage);

const installHelp = document.createElement("p");
installHelp.className = "pwa-install-help";
installHelp.setAttribute("role", "status");
installHelp.hidden = true;

const installActions = document.createElement("div");
installActions.className = "pwa-install-actions";

const installButton = document.createElement("button");
installButton.className = "button button-primary";
installButton.type = "button";
installButton.textContent = isIosDevice
  ? "Comment installer"
  : isWindowsDevice
    ? "Télécharger pour Windows"
    : "Installer l’application";

const dismissButton = document.createElement("button");
dismissButton.className = "pwa-install-dismiss";
dismissButton.type = "button";
dismissButton.setAttribute("aria-label", "Fermer la proposition d’installation");
dismissButton.textContent = "×";

installActions.append(installButton, dismissButton);
installBanner.append(installCopy, installHelp, installActions);
document.body.append(installBanner);

const hideInstallBanner = () => {
  installBanner.hidden = true;
  rememberInstallPromptDismissal();
};

const showInstallInstructions = () => {
  if (isIosDevice) {
    installHelp.textContent = "Dans Safari, touchez Partager, puis « Sur l’écran d’accueil ».";
  } else if (/android/i.test(navigator.userAgent)) {
    installHelp.textContent = "Dans Chrome, ouvrez le menu ⋮ puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».";
  } else {
    installHelp.textContent = "Dans le menu du navigateur, choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».";
  }
  installHelp.hidden = false;
  installButton.textContent = "Compris";
  showingInstallHelp = true;
};

installButton.addEventListener("click", async () => {
  if (showingInstallHelp) {
    hideInstallBanner();
    return;
  }

  if (isWindowsDevice) {
    window.location.assign(windowsInstallerUrl);
    rememberInstallPromptDismissal();
    return;
  }

  if (!deferredInstallPrompt) {
    showInstallInstructions();
    return;
  }

  try {
    await deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (choice.outcome === "accepted") {
      hideInstallBanner();
    } else {
      showInstallInstructions();
    }
  } catch (error) {
    console.error("Impossible d’ouvrir la demande d’installation de BiblioFlix.", error);
    deferredInstallPrompt = null;
    showInstallInstructions();
  }
});

dismissButton.addEventListener("click", hideInstallBanner);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (!isInstalled() && !hasDismissedInstallPrompt()) {
    if (showingInstallHelp) {
      installHelp.hidden = true;
      installButton.textContent = isWindowsDevice ? "Télécharger pour Windows" : "Installer l’application";
      showingInstallHelp = false;
    }
    installBanner.hidden = false;
  }
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  hideInstallBanner();
});

if (!isInstalled() && !hasDismissedInstallPrompt()) {
  installBanner.hidden = false;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Impossible d'activer le mode hors ligne de BiblioFlix.", error);
    });
  });
}
