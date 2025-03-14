function getProductName() {
    let titleElement = document.querySelector("#productTitle");
    return titleElement ? titleElement.innerText.trim() : null;
}

function waitForProductTitle(callback) {
    let observer = new MutationObserver((mutations, observer) => {
        let title = getProductName();
        if (title) {
            observer.disconnect(); // Stop observing when found
            callback(title);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProductDetails") {
        let productName = getProductName();

        if (productName) {
            sendResponse({ productName });
        } else {
            waitForProductTitle((title) => {
                sendResponse({ productName: title });
            });
        }
        return true; // Keeps the message channel open for async response
    }
});
