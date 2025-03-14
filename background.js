chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchPrices") {
        let productName = request.productName;
        let flipkartURL = `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`;
        let myntraURL = `https://www.myntra.com/${encodeURIComponent(productName)}`;
        let cromaURL = `https://www.croma.com/search/?text=${encodeURIComponent(productName)}`;

        Promise.all([
            fetch(flipkartURL).then(res => res.text()),
            fetch(myntraURL).then(res => res.text()),
            fetch(cromaURL).then(res => res.text())
        ])
        .then(([flipkartData, myntraData, cromaData]) => {
            sendResponse({
                flipkart: flipkartURL,
                myntra: myntraURL,
                croma: cromaURL
            });
        })
        .catch(error => {
            sendResponse({ error: "Error fetching data" });
        });

        return true; // Required to keep the async response open
    }
});
