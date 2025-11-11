browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        return Promise.resolve({ farewell: "goodbye" });
});

browser.action.onClicked.addListener(async (tab) => {
    try {
        const url = tab.url;
        
        // Inject a script into the active tab to copy URL to clipboard
        // This is necessary because service workers don't have direct clipboard access
        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            func: async (urlToCopy) => {
                try {
                    await navigator.clipboard.writeText(urlToCopy);
                    console.log("URL copied to clipboard:", urlToCopy);
                } catch (err) {
                    console.error("Failed to copy URL to clipboard:", err);
                    throw err;
                }
            },
            args: [url]
        });
    } catch (err) {
        console.error("Failed to copy page URL:", err);
        // Clipboard API might not be available on certain pages (e.g., chrome://, about:, etc.)
    }
});
