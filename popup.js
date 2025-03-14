document.addEventListener("DOMContentLoaded", () => {
    let productNameElement = document.getElementById("productName");
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs.length) return;
        let tabId = tabs[0].id;

        chrome.tabs.sendMessage(tabId, { action: "getProductDetails" }, (response) => {
            if (response && response.productName) {
                productNameElement.innerText = response.productName;
                
                chrome.runtime.sendMessage({ action: "fetchPrices", productName: response.productName }, (data) => {
                    if (data.error) {
                        document.getElementById("productInfo").innerText = "Error fetching prices.";
                    }
                });
            } else {
                productNameElement.innerText = "Product name not found.";
            }
        });
    });
});
