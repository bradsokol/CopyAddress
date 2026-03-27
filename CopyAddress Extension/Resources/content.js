// Block cookies on matched domains by injecting into the page's main world.
// Safari content scripts run in an isolated world, so Object.defineProperty
// on document.cookie only works if executed in the main world via a script tag.

(function () {
    "use strict";

    const script = document.createElement("script");
    script.textContent = `(function() {
        try {
            Object.defineProperty(document, "cookie", {
                get: function() { return ""; },
                set: function() {},
                configurable: false
            });
        } catch (e) {
            console.warn("CopyAddress: Failed to override document.cookie:", e);
        }
    })();`;

    (document.documentElement || document.head || document.body).appendChild(script);
    script.remove();
})();
