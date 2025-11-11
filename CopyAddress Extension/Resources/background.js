browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        return Promise.resolve({ farewell: "goodbye" });
});

browser.action.onClicked.addListener(async (tab) => {
    try {
        const url = tab.url;
        const title = tab.title || url; // Use URL as fallback if title is empty/undefined
        
        // Format as Markdown link: [title](url)
        const markdownLink = `[${title}](${url})`;
        
        // Inject a script into the active tab to copy Markdown link to clipboard
        // This is necessary because service workers don't have direct clipboard access
        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            func: async (markdownLinkToCopy) => {
                try {
                    await navigator.clipboard.writeText(markdownLinkToCopy);
                    console.log("Markdown link copied to clipboard:", markdownLinkToCopy);
                } catch (err) {
                    console.error("Failed to copy Markdown link to clipboard:", err);
                    throw err;
                }
            },
            args: [markdownLink]
        });
    } catch (err) {
        console.error("Failed to copy page link:", err);
        // Clipboard API might not be available on certain pages (e.g., chrome://, about:, etc.)
    }
});
