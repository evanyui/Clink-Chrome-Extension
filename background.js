const url = 'http://localhost:3000/';

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({}, function(tabs) {
        // Add all active tabs
        const tabsArray = [];
        tabs.forEach(function(tab) {
            // TODO: need to verify if that is valid web, bug: chrome://extensions got added too
            tabsArray.push(tab.url);
        });

        // Generate random 4 digits
        const id = Math.floor(Math.random() * (9999 - 1111)) + 1111

        // Nested callback to grab current tab
        chrome.tabs.query(
            {currentWindow: true, active : true},
            function(current) {
                // Grab current tab's index
                const currentTab = tabsArray.indexOf(current[0].url)

                // Send request to store session data
                storeSession(id, tabsArray, currentTab)

                // Open tab to clink
                chrome.tabs.create({ url: `${url}#${id}` });
            }
        )

    });
});

function storeSession(id, urls, currentTab) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${url}api/storeSession`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id,
        urls,
        currentTab
    }));
}

