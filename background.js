// background.js
chrome.contextMenus.remove("fillRandomNumbers", () => {
  // Handle the case where the menu item doesn’t exist
  if (chrome.runtime.lastError) {
    console.log("Menu item not found, proceeding to create it.");
  }
  // Create the menu item
  chrome.contextMenus.create({
    id: "fillRandomNumbers",
    title: "Fill Inputs with Random Numbers",
    contexts: ["all"]
  });
});

// Handle clicks on the menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "fillRandomNumbers") {
    chrome.tabs.sendMessage(tab.id, { action: "fillRandomNumbers" });
  }
});