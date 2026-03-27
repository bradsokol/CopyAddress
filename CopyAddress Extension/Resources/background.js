// Blocked domains for cookie cleanup.
// Keep this list in sync with rules.json and manifest.json.
const BLOCKED_DOMAINS = ["cyclingnews.com"];

// Clear any pre-existing cookies for blocked domains on install/update
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install" || details.reason === "update") {
    for (const domain of BLOCKED_DOMAINS) {
      try {
        const cookies = await browser.cookies.getAll({ domain });
        for (const cookie of cookies) {
          const protocol = cookie.secure ? "https" : "http";
          const url = `${protocol}://${domain}${cookie.path}`;
          await browser.cookies.remove({ url, name: cookie.name });
        }
      } catch (e) {
        console.warn(`CopyAddress: Failed to clear cookies for ${domain}:`, e);
      }
    }
  }
});

browser.action.onClicked.addListener(async (tab) => {
  try {
    const url = tab.url;
    const title = tab.title || url;

    const markdownLink = `[${title}](${url})`;

    // Inject a script into the active tab to copy Markdown link to clipboard
    // This is necessary because service workers don't have direct clipboard access
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (markdownLinkToCopy) => {
        try {
          await navigator.clipboard.writeText(markdownLinkToCopy);
        } catch (err) {
          console.error("Failed to copy Markdown link to clipboard:", err);
          throw err;
        }
      },
      args: [markdownLink],
    });
  } catch (err) {
    // Clipboard API might not be available on certain pages (e.g., chrome://, about:, etc.)
    console.error("Failed to copy page link:", err);
  }
});
