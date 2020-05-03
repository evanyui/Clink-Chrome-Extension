chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({}, function(tabs) {
        var tabsArray = [];
        tabs.forEach(function(tab) {
            // TODO: need to verify if that is valid web, bug: chrome://extensions got added too
            tabsArray.push(tab.url);
        });

        // Send a post request to store session
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3000/api/storeSession', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            id: "abcde",
            urls: tabsArray,
            currentTab: 0
        }));

        // TODO:  open new tab to web page and load urls
    });
});
